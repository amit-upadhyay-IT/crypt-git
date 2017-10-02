var find = require('find');
var fs = require('fs');

var fileContent = fs.readFileSync('../.cryptfiles', 'utf8');

var fileNames = fileContent.split('\n');

getFiles();

function getFiles()
{
/*
    find.file(fileNames[0], './../', function(files) {
        console.log(files);
    });
*/

    find.eachfile(fileNames[0], './../', function(file) {
        console.log(file);
        if (file.indexOf('node_modules') !== -1)// the directory where search is going is under node_modules
            console.log('fuck');
    })
        .end(function() {
            console.log('Ended');
        });
}
