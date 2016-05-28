'use strict';
var pmongo = require('promised-mongo');

module.exports =  {};

module.exports.saveModifiedCollection = function(collection, email){
    collection.findAndModify({
        query: {_id: pmongo.ObjectId(email._id)},
        update: {$set: {isProcessed: true}}
    })
}