
// the input to be passed here is array of strings
var matchPushCmd = function (inputArray) {

    var inputCmd = '';
    // cancatenate the elements of inputArray with space included after each word
    for (var i = 0; i < inputArray.length; ++i)
    {
        inputCmd = inputCmd + inputArray[i] + ' ';
    }
    inputCmd = inputCmd.slice(0, -1);//slicing the last space.

    var toMatchCmd1 = 'git push -u origin master';
    var toMatchCmd2 = 'git push origin master';
    return (inputCmd === toMatchCmd1 || inputCmd === toMatchCmd2);
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

    var toMatchCmd1 = 'git clone *';
    return inputCmd.match(toMatchCmd1);
}

var returnObj = matchCommitCmd(process.argv.slice(2));
if (returnObj !== null)
    console.log(returnObj.input);
else
    console.log('Invalid command');
