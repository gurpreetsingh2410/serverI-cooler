'use strict';

var ObjectValidatorFactory = function (errorConfig) {
    return {

        insertValidator : function (req, res) {
            id : req.assert('id', 'Invalid id').len(1,20);
            product_name : req.assert('product_name', 'Invalid Name').len(1,20);
            product_expiry : req.assert('product_expiry', 'Invalid Date').len(1,20);
            count : req.assert('count', 'Count field cannot be empty').isInt();
            var p = Promise.defer();

            req.getValidationResult().then(function (result) {
                if(!result.isEmpty()){
                    res.status(400).json({status : errorConfig.errorCodes.failed, message: result.array()});
                }else{
                    p.resolve(req.body);
                }
            });

            return p.promise;
        },

        getValidatorID : function (req, res) {
            id : req.assert('id', 'Invalid id').isInt();
            var p = Promise.defer();

            req.getValidationResult().then(function (result) {
                if(!result.isEmpty()){
                    res.status(400).json({status : errorConfig.errorCodes.failed, message: result.array()});
                }else{
                    p.resolve(req.body);
                }
            });

            return p.promise;
        }
    }
};

module.exports = ObjectValidatorFactory;
