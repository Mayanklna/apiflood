var mongoose = require('mongoose');

var weblinkSchema = new mongoose.Schema({
  weblink: {
    type: String

  },
  StartDate: {
    type: String,
    //   required:true,
    //   minlength:10,
    //   maxlength:2000
  },
  EndDate: {
    type: String,
    //  required:true,
    //  minlength:10,
    //  maxlength:2000
  },
  CountryName: {
    type: String,
    //  required:true,
    //  minlength:3,
    //  maxlength:2000
  }
  ,



});

module.exports = mongoose.model('floodlistweblinks', weblinkSchema);