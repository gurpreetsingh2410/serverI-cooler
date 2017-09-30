'use strict';
var container = require('kontainer-di'),
    dbConfig = require('./assets/config/database'),
    serverConfig = require('./assets/config/server'),
    errorConfig = require('./assets/config/error_codes_messages/error_route');

var DatabaseFactory = require('./assets/services/database');

var ServerFactory = require('./assets/modules/server');


var GlobalFactory = require('./src/route');

//Config Container
container.register('serverConfig', [] ,serverConfig);
container.register('dbConfig', [], dbConfig);
container.register('errorConfig', [], errorConfig);
container.register('server', ['serverConfig'], ServerFactory);

//Database Container
container.register('Database', ['dbConfig'], DatabaseFactory);

//Schema Container
container.register('ObjectSchema', [], GlobalFactory.ObjectSchemaFactory);

//Object Container
container.register('ObjectValidator', ['errorConfig'], GlobalFactory.ObjectFactory.ObjectValidatorFactory);
container.register('ObjectService', ['Database', 'ObjectSchema'], GlobalFactory.ObjectFactory.ObjectServiceFactory);
container.register('ObjectApi', ['server', 'ObjectValidator', 'ObjectService', 'errorConfig'], GlobalFactory.ObjectFactory.ObjectApiFactory);

module.exports = container;