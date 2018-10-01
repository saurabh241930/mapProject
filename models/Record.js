var mongoose = require('mongoose');

var RecordSchema = new mongoose.Schema({

      regionName:String,

      saleDate:Date,

      saleAmount:Number


})

module.exports = mongoose.model("Record", RecordSchema);