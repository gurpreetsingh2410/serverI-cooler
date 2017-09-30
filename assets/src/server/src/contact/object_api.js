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

    function getObjectAll(req, res) {
        objectService.getObjectAll().then(function (object, err) {
            res.status(200).send(object);
        }).catch( function (err) {
            res.status(400).json({status : errorConfig.errorCode.contentNotFound,
                message: errorConfig.errorMessage.contentNotFound});
        })
    }

    function getObject(req, res){
        objectValidator.getValidatorID(req, res).then(function (objectID) {
            var objectID = parseInt(req.params.id);
            objectService.getObject(objectID).then(function (objects, err) {
                res.status(200).send(objects);
            }).catch(function (err) {
                res.status(400).json({
                    status: errorConfig.errorCode.contentNotFound,
                    message: errorConfig.errorMessage.contentNotFound
                });
            });
        })
    }

    app.post('/api/object', insertObject);
    app.get('/api/object/:id', getObject);
    app.get('/api/object', getObjectAll);

    return {
        insertObject : insertObject,
        getObject : getObject,
        getObjectAll : getObjectAll
    };


};

module.exports = ObjectApiFactory;
