'use strict';
var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    Promise = require('bluebird'),
    expressValidator = require ('express-validator');

var ServerFactory = function(config){
    var app = express(),
        server = http.createServer(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(expressValidator());
    app.set('json spaces', null, 3);

    function start(){
        var listenPromise = Promise.promisify(server.listen, server);
        return listenPromise(config.port, config.url)
            .then(function(){
                var host = server.address().address;
                var port = server.address().port;
                console.log('Express is listening on', host + ':' + port);
            });
    }

    function stop(){
        server.close();
    }

    return {
        start: start,
        stop: stop,
        app: app,
        server: server
    }
};

module.exports = ServerFactory;