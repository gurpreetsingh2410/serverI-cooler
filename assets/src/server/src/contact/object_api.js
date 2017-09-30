'use strict';

var ObjectApiFactory = function (express, objectValidator, objectService, errorConfig) {
    var app = express.app;


    function insertObject(req, res) {
        objectValidator.insertValidator(req, res).then(function (object) {
            var data = {
                id: object.id,
                product_name: object.product_name,
                product_expiry : object.product_expiry,
                count : object.count
            };
           objectService.insertData(data).then(function () {
                res.status(200).json({
                    status: errorConfig.errorCodes.success,
                    message: errorConfig.errorMessage.success
                });
            }).catch(function (err) {
               res.status(404).json({
                   status: errorConfig.errorCode.failed,
                   message: errorConfig.errorMessage.failed,
                   "Values to be Unique": err
               });
            })
        })
    }

    app.post('/api/object', insertObject);

    return {
        insertObject : insertObject
    };


};

module.exports = ObjectApiFactory;
