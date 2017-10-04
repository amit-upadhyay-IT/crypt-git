var find = require('find');
var fs = require('fs');


module.exports = function ()
{

    var fileContent = fs.readFileSync('./.cryptfiles', 'utf8');
    var fileNames = fileContent.split('\n');

    console.log('inside getfiles');
    /*TODO: the files under node_modules should not get encrypted because they are however now pushed on git repo*/
    find.file(fileNames[0], './../', function(file) {
        if (file.indexOf('node_modules') !== -1)// the directory where search is going is under node_modules
        {
            //return;
        }
        console.log(file);
    })
}

