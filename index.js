'use strict';

var cmd = require('node-cmd');
var fs = require('fs');
var find = require('find');

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
