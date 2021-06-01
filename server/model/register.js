var mongoose  =  require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
var csvSchema = new mongoose.Schema({
  email: {
              type : String,
              required:true
            
         },
 password:{       
                  type:String,
                  required:true
              
             }
});

csvSchema.plugin(passportLocalMongoose);
const Registerdb =mongoose.model('Registers',csvSchema);
 

module.exports =Registerdb