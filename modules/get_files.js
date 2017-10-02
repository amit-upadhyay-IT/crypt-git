var find = require('find');
var fs = require('fs');

var fileContent = fs.readFileSync('../.cryptfiles', 'utf8');

var fileNames = fileContent.split('\n');

getFiles();

function getFiles()
{
    find.file(fileNames[0], './../', function(files) {
        console.log(files);
    });
}
