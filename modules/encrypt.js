var crypto = require('crypto');
var algorithm = 'aes-256-ctr';

var readline = require('readline');
var stream = require('stream');
var fs = require('fs');
var zlib = require('zlib');


// accepting password
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('\nEnter encryption password: ');
rl.prompt();
rl.on('line', function(text) {
    if (text.length > 5 && text.split(' ').length == 1)// split is checking if the password has space or not
    {
        rl.close();
    }
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});


