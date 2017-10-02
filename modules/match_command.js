
var matchPushCmd = function (inputArray) {

    var inputCmd = '';
    // cancatenate the elements of inputArray with space included after each word
    for (var i = 0; i < inputArray.length; ++i)
    {
        inputCmd = inputCmd + inputArray[i] + ' ';
    }

    inputCmd = inputCmd.slice(0, -1);

    return (inputCmd === 'git push -u origin master' || inputCmd === 'git push origin master');
}

var val = matchPushCmd(process.argv.slice(2));
console.log(val);
