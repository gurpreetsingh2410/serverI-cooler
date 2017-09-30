'use strict';
var container = require('./assets/src/server/containerConfig');

var ObjectApi = container.get('ObjectApi');

var server = container.startModule('server', { async: true})
    .then(function () {
        console.log('Server Running!!');
        console.log('Available methods');
        console.log('\tPOST /api/object');
        console.log('\tGET /api/object');
        console.log('\tGET /api/object/:id');
    });

