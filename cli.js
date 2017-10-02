#!/usr/bin/env node
'use strict';

var meow = require('meow');
var mainfile = require('./index.js');

var cli = meow({
    help: [
        'Usage',
        '    cg git push -u origin master // this will push to your github repo with encrypted content of files you mentioned',
        '    cg clone <project_link> // this decrypt the file content which you mentioned',
        'Example',
        '    cg git push -u origin master',
        '',
        'Developer',
        '    Amit Upadhyay (github.com/amit-upadhyay-it)'
    ].join('\n')
});

mainfile(process.argv.slice(2));
