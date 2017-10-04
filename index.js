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

var match_commands = require('./modules/match_command.js');

module.exports = function (inputArray) {

    // checking if push cmd
    var isPush = match_commands.matchPushCmd(inputArray);
    if (isPush !== null)
    {
        theReqCmd = isPush.input;
        console.log('Pushing :',isPush.input);
        generateIV();// first step I am doing is generating IV, and it its callback I am calling other required function
    }
    else
    {
        // checking if commit cmd
        var isCommit = match_commands.matchCommitCmd(inputArray);
        if (isCommit !== null)
        {
            console.log('Commiting :', isCommit.input);
        }
        else
        {
            // on invalid command exit the process, so that user can restart program
            console.log('Invalid Command, Try again');
            process.exit(0);
        }
    }
};


function generateIV()
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

function getPassword(iv)
{
    rl.setPrompt('Enter the encryption password: ');
    rl.prompt();
    rl.on('line', function(text) {
        if (text.length > 5 && text.split(' ').length == 1)// split is checking if password has some space inbetween
        {
            password = get32Bytes(text);
            rl.close();// closing the readline and performing required calls
        }
        rl.prompt();
    }).on('close', function() {
        getFiles(iv);
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
    var fileContent = fs.readFileSync('./.cryptfiles', 'utf8');
    var fileNames = fileContent.split('\n');

    /*TODO: the files under node_modules should not get encrypted because they are however not pushed to the git repo*/
    /*TODO: Now it's searching for the file name written in file line, later I should run a loop and do the same for rest of the lines*/
    find.file(fileNames[0], __dirname, function(file) {

        for (var i = 0; i < file.length; ++i)
        {
            if (file[i].indexOf('node_modules') !== -1)// the directory where search is going under node_modules
            {
                // do something
            }
            else
            {
                // call the file encryption function here, because I don't want to encrypt the files under node_modules
                doFileEncryption(file[i], iv, i, file.length);// arg1: filepath, arg2:iv, arg3: i (current file position in file array), arg4: total number of files, The arg3 and arg4 are passed because we need to do push when all the required files are encrypted, so in doFileEncryption method we will check if we have successfully encrypted the last file then we do the push to repo.
            }
            console.log(file[i]);
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

// the push operation can be async because we will push to the repo in the end, after we are done with encryption, and deletion of non-encrypted file.
function doPushOperation()
{
    console.log('inside doPushOperation');
    if (theReqCmd !== '')
    {
        // an async operation because it is required.
        console.log('inside theReqCmd !== ');
        cmd.get(
        theReqCmd,
            function(err, data, stderr) {
                console.log('data: ', data);
            }
        );
    }
}
