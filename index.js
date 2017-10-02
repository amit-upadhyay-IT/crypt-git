'use strict';

var cmd = require('node-cmd');

module.exports = function (inputArray) {
    console.log(inputArray);

    cmd.get(
        'pwd',
        function(err, data, stderr){
            console.log('the current working dir is : ',data)
        }
    );

};
