'use strict';

var cmd = require('node-cmd');
var fs = require('fs');
var find = require('find');

var crypto = require('crypto');
var algorithm = 'aes-256-ctr';
var password = ''; // should be entered by the user, it has be to 32 bytes in size

var stream = require('stream');
var zlib = require('zlib');

var match_commands = require('./modules/match_command.js');

module.exports = function (inputArray) {

    // checking if push cmd
    var isPush = match_commands.matchPushCmd(inputArray);
    if (isPush !== null)
    {
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
        getFiles(iv);
    });
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
            }
            console.log(file[i]);
        }
    });
}

function doFileEncryption(filePath, iv)
{
    var r = fs.createReadStream(filePath);

    var zip = zlib.creatGzip();

    var encrypt = crypto.createCipheriv(algorith, password, iv);

    var w =  fs.createWriteStream(filePath+'.crypt');

    r.pipe(zip).pipe(encrypt).pipe(w);

    r.on('end', function() {
        fs.unlink(filePath, function(err) {
            if (err)
                console.log(err);
        });
    });
}

// the push operation can be async because we will push to the repo in the end, after we are done with encryption, and deletion of non-encrypted file.
function doPushOperation(theCmd)
{
    // an async operation because it is required.
    cmd.get(
    theCmd,
        function(err, data, stderr) {
            console.log('data: ', data);
        }
    );
}
