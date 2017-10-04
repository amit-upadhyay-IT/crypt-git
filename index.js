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
        getFiles();
        //doPushOperation(isPush.input);
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
    });
}

function getFiles()
{
    var fileContent = fs.readFileSync('./.cryptfiles', 'utf8');
    var fileNames = fileContent.split('\n');

    /*TODO: the files under node_modules should not get encrypted because they are however not pushed to the git repo*/
    find.file(fileNames[0], __dirname, function(file) {
        if (file.indexOf('node_modules') !== -1)// the directory where search is going under node_modules
        {
            // do something
        }
        console.log(file);
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
