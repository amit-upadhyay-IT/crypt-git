'use strict';

var cmd = require('node-cmd');

var match_commands = require('./modules/match_command.js');

module.exports = function (inputArray) {

    // checking if push cmd
    var isPush = match_commands.matchPushCmd(inputArray);
    if (isPush !== null)
    {
        console.log('Pushing :',isPush.input);
        doPushOperation(isPush.input);
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

    cmd.get(
        'pwd',
        function(err, data, stderr){
            console.log('the current working dir is : ',data)
    });

};

// the push operation can be async because we will push to the repo in then end, after we are done with encryption, and deletion of non-encrypted file.
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
