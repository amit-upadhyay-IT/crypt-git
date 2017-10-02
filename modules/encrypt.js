var crypto = require('crypto');
var algorithm = 'aes-256-ctr';

var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('\nEnter password: ');
rl.prompt();
rl.on('line', function(text) {
    if (text.length > 5)
    {
        rl.close();
    }
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});
