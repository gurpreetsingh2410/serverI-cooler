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
        },

        getObject: function(objectId) {
            var p = Promise.defer();
            objectModel.findOne({$query: {id : objectId}, $maxTimeMS: 100},{_id:0})
                .then(function (result) {
                    if(result){
                        p.resolve(result);
                    } else {
                        p.reject();
                    }
                }).catch(function (err) {
                p.reject("Object service failure " + err.toString());
            });
            return p.promise;
        },

        getObjectAll: function(){
            var p = Promise.defer();
            objectModel.find().then(function (data) {
                if(data.length > 0){
                    p.resolve(data);
                }else{
                    p.reject();
                }
            }).catch(function (err) {
                p.reject("Registration service failure " + err.toString());
            });
            return p.promise;        }
    }

};

module.exports = ObjectServiceFactory;
