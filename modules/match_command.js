
// the input to be passed here is array of strings
var matchPushCmd = function (inputArray) {

    var inputCmd = '';
    // cancatenate the elements of inputArray with space included after each word
    for (var i = 0; i < inputArray.length; ++i)
    {
        inputCmd = inputCmd + inputArray[i] + ' ';
    }
    inputCmd = inputCmd.slice(0, -1);//slicing the last space.

    // working as a regex
    var toMatchCmd1 = 'git push -u origin *';
    var toMatchCmd2 = 'git push origin *';
    var toMatchCmd3 = 'push';
    return (inputCmd.match(toMatchCmd1) || inputCmd.match(toMatchCmd2) || inputCmd.match(toMatchCmd3));
}


// the input to be passed here is array of strings
// returns null of not matched otherwise returns []
var matchCommitCmd = function (inputArray) {

    var inputCmd = '';
    // cancatenate the elements of inputArray with space included after each word
    for (var i = 0; i < inputArray.length; ++i)
    {
        inputCmd = inputCmd + inputArray[i] + ' ';
    }
    inputCmd = inputCmd.slice(0, -1);//slicing the last space.

    // working as a regex
    var toMatchCmd1 = 'git clone *';
    var toMatchCmd2 = 'clone';
    var toMatchCmd3 = 'pull';
    return (inputCmd.match(toMatchCmd1) || inputCmd.match(toMatchCmd2) || inputCmd.match(toMatchCmd3));
}

module.exports.matchPushCmd = matchPushCmd;
module.exports.matchCommitCmd = matchCommitCmd;

/*
var returnObj = matchCommitCmd(process.argv.slice(2));
if (returnObj !== null)
    console.log(returnObj.input);
else
    console.log('Invalid command');
*/
