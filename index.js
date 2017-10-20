'use strict';

var cmd = require('node-cmd');
var fs = require('fs');
var find = require('find');

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = ''; // should be entered by the user, it has be to 32 bytes in size

var stream = require('stream');
var zlib = require('zlib');
var readline =require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

var theReqCmd = '';
var commitMessage = '';

var flag = 0;

var match_commands = require('./modules/match_command.js');

var prevIV = '';


module.exports = function (inputArray) {

    getPrevIV();

    // checking if push cmd
    var isPush = match_commands.matchPushCmd(inputArray);
    if (isPush !== null)
    {
        flag = 1;
        commitMessage = isPush.input.substr(5, isPush.input.length);
        theReqCmd = isPush.input;
        generateIV();// first step I am doing is generating IV, and it its callback I am calling other required function
    }
    else
    {
        // checking if commit cmd
        var isDecrypt = match_commands.matchDecrypt(inputArray);
        if (isDecrypt !== null)
        {
            flag = 2;
            doDecrypt();
        }
        else
        {
            // on invalid command exit the process, so that user can restart program
            console.log('Invalid Command, Try again');
            process.exit(0);
        }
    }
};


function getPrevIV()
{
    try {
        var contentIV = fs.readFileSync('./.iv', 'utf8', function(err) {
            if (err)
                console.log (err);
            else
                prevIV = contentIV;
                console.log('IV resaved');
        });
    }
    catch(ex)
    {
        // if the file doesn't exist then no issue so I wouldn't show any exception
    }
}


function doDecrypt()
{
    readIV();

    // obsolete code which was being used in v1.5.0 to pull
/*
        cmd.get(
        'git pull',
            function(err, data, stderr) {
                if (err)
                {
                    console.log(err);
                    process.exit(0);
                }
                else
                {
                    console.log(data);
                    readIV();
                }
            }
        );
*/
}


// simply reading the iv
function readIV()
{
    try
    {
        var ivContent = fs.readFileSync('./.iv', 'utf8');
        var iv = new Buffer(ivContent, 'hex');
        getPassword(iv);
    }
    catch(ex)
    {
        console.log('You are trying to decrypt some different project\nCheck:\n1)Clone same project which you have encrypted via crypt-git and pushed to git\n2)This repo has never been encrypted\n\n');
        process.exit(0);
    }
}


function findEncryptedFiles(iv)
{
    find.file(/\.crypt$/, './', function(files) {// using __dirname is a problem here

        for (var i = 0; i < files.length; ++i)
        {
            var path = files[i];// this file name has .crypt addpended
            var writablePath = path.replace('.crypt', '');
            decryptTheFile(iv, files[i], writablePath);
        }
    });
}


function decryptTheFile(iv, filePath, writablePath)
{
    // input file
    var r = fs.createReadStream(filePath);
    // decrypt content
    var decrypt = crypto.createDecipheriv(algorithm, password, iv);
    // unzip content
    var unzip = zlib.createGunzip();
    // write file
    var w = fs.createWriteStream(writablePath);

    // start pipe
    r.pipe(decrypt).pipe(unzip).pipe(w);

    r.on('end', function() {
        fs.unlink(filePath, function(err) {
            if (err)
                console.log(err);
            else
            {
                console.log(filePath + ' File decrypted successfully !!');
            }
        });
    });
}


function doesIVFileExists()
{
    var ivContent = '';

    try
    {
        ivContent = fs.readFileSync('./.iv', 'utf8');
        if (ivContent === '') // the file exists but it's empty or contains invalid info.
        {
            return false;
        }
        else if (new Buffer(ivContent, 'hex').byteLength !== 16)// if the file content if inappropriate then return false
        {
            return false;
        }
        return ivContent;// if things are right then returning the content of file;
    }
    catch (ex)
    {
        return false;// i.e. the file doesn't exists thus we return false
    }
}


function generateIV()
{
    var val = doesIVFileExists();
    if (val) // if file exists no need to generate new
    {
        getPassword(new Buffer(val, 'hex'));
    }
    else
    {
        var iv = crypto.randomBytes(16);
        var hexiv = iv.toString('hex');

        var ivw = fs.createWriteStream('./.iv');
        var Readable = stream.Readable;
        var s = new Readable();
        s._read = function noop() {};
        s.push(hexiv);
        s.push(null);
        s.pipe(ivw);

        s.on('end', function() {
            // call the next required step
            getPassword(iv);
        });

    }

}


function getPassword(iv)
{
    var msgPrpmpt = '';
    if (flag == 1)
        msgPrpmpt = 'Enter the encryption password: ';
    else if (flag == 2)
        msgPrpmpt = 'Enter the decryption password: ';

    rl.setPrompt(msgPrpmpt);
    rl.prompt();
    rl.on('line', function(text) {
        if (text.length > 5 && text.split(' ').length == 1)// split is checking if password has some space inbetween
        {
            password = get32Bytes(text);
            rl.close();// closing the readline and performing required calls
        }
        else
            rl.prompt();
    }).on('close', function() {
        if (password.length < 1)
        {
            console.log('\nNo password entered\n');
            process.exit(0);
        }
        if (flag === 1)
        {
            getFiles(iv);
        }
        else if (flag == 2)
        {
            console.log('Please wait, decrypting files...');
            findEncryptedFiles(iv);
        }
    });
}


function get32Bytes(text)
{
    while (text.length <= 32)
        text += text;
    return text.substr(0, 32);
}


function getFiles(iv)
{
    var fileContent = '';
    try {
        fileContent = fs.readFileSync('./.cryptfiles', 'utf8');
    }
    catch(ex) {
        console.log('You need to maintain \'.cryptfiles\', kindly read the documentation:\n"cg --docs"');
        process.exit(0);
    }
    var fileNames = fileContent.split('\n');

    /*TODO: Now it's searching for the file name written in file line, later I should run a loop and do the same for rest of the lines*/
    find.file(fileNames[0], './', function(file) {

        if (file.length == 0)
        {
            console.log('\nThere are no files to be encrypted\n');
            process.exit(0);
        }

        for (var i = 0; i < file.length; ++i)
        {

            /* the files under node_modules should not get encrypted because they are however not pushed to the git repo*/
            if (file[i].indexOf('node_modules') !== -1)// the directory where search is going under node_modules
            {
                // do something
            }
            else
            {
                // call the file encryption function here, because I don't want to encrypt the files under node_modules
                doFileEncryption(file[i], iv, i, file.length);// arg1: filepath, arg2:iv, arg3: i (current file position in file array), arg4: total number of files, The arg3 and arg4 are passed because we need to do push when all the required files are encrypted, so in doFileEncryption method we will check if we have successfully encrypted the last file then we do the push to repo.
            }
        }
    });
}


function doFileEncryption(filePath, iv, currPos, totalCount)
{
    var r = fs.createReadStream(filePath);

    var zip = zlib.createGzip();

    var encrypt = crypto.createCipheriv(algorithm, password, iv);

    var w =  fs.createWriteStream(filePath+'.crypt');

    r.pipe(zip).pipe(encrypt).pipe(w);

    if (currPos === totalCount-1)// deleting as well as doing push
    {
        r.on('end', function() {
            fs.unlink(filePath, function(err) {
                if (err)
                    console.log(err);
                else
                    doPushOperation();
            });
        });
    }
    else// just deleting the normal file.
    {
        r.on('end', function() {
            fs.unlink(filePath, function(err) {
                if (err)
                    console.log(err);
            });
        });
    }
}


/*TODO: after successful push we need to ask the user whether to perform decryption operation or not*/
// the push operation can be async because we will push to the repo in the end, after we are done with encryption, and deletion of non-encrypted file.
function doPushOperation()
{
    if (commitMessage === '')
        commitMessage = 'Commit via crypt-git';
    var msg = 'git add -A && git commit -m "'+commitMessage+'" && git push -u origin master';
    //var msg = 'git add -A && git commit -m \''+commitMessage+'\' && git push -u origin master';

    if (theReqCmd !== '')// just a normal check if user wants to push or not
    {
        // an async operation because it is required.
        cmd.get(
        msg,
            function(err, data, stderr) {
                if (err)
                {
                    // if the push fails then I need to restore the previous iv otherwise it will give error in decrypting and decompressing
                    console.log(err);
                }
                else
                    console.log(data);
            }
        );
    }
}

