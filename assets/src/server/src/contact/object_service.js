'use strict';

var ObjectServiceFactory = function (database, schema) {
    var objectModel = database.model('Fridge', schema.objectSchema, 'fridge');

    return {

        insertData: function(object){
            var data = new objectModel({
                id      : object.id,
                product_name   : object.product_name,
                product_expiry   : object.product_expiry,
                count : object.count
            });

            var p = Promise.defer();
                    data.save().then(function (result){
                        if (result) {
                            p.resolve(true);
                        }
                    }).catch(function (err) {
                        p.reject('Object Service Failed'+ err);
                    });

            return p.promise;
        }
    }

};

module.exports = ObjectServiceFactory;
