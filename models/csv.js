var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    floodname : {
              type : String
            
         },
    flooddata:{
        type: []
    },
  
});

module.exports = mongoose.model('studentsrecords',csvSchema);