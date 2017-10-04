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

    // we are throwing in async function, so we can't catch them and they will crash your server
    try {
        find.eachfile(fileNames[0], './../', function(file) {
            if (file.indexOf('node_modules') !== -1)// the directory where search is going is under node_modules
            {
                throw new Error();
                //done();
            }
            console.log(file);
        })
            .end(function() {
                console.log('Ended');
            });


    }
    catch (ex) {
        console.log('Exception :');
    }
}
