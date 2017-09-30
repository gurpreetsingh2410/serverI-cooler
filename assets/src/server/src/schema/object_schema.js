'use strict';
var ObjectSchemaFactory = function () {

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    mongoose.Promise = global.Promise;

    var objectSchema = new Schema({
            id : {},
            product_name : {},
            product_expiry : {},
            count : {}}
    ,{ collection : 'fridge' });

    return {
        objectSchema : objectSchema
    };

};

module.exports = ObjectSchemaFactory;
