const mongoose=require('mongoose');
const yup=require('yup');

//   floodupdates scema
const floodupdatesschema=new mongoose.Schema({
    
    StartDate:{
         type:String,
         required:true,
         minlength:10,
         maxlength:2000
    },
   EndDate:{
        type:String,
        required:true,
        minlength:10,
        maxlength:2000
   },
    CountryName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:2000
      }
    ,FloodCSVData:{
        type:[],
        required:true,
         } 
   
   

})
const validateflooddata=(flood) =>{
    const schema=yup.object().shape({
       myStartDate:yup.string().required().min(10).max(2000),
       myEndDate:yup.string().required().min(10).max(2000),
       myCountryName:yup.string().required().min(3).max(2000),
       
 });
 return schema.validate(flood).then((flood)=>flood).catch((error) =>{
     return {
         message:error.message
        }
 });
}
exports.FLOODUPDATES=new mongoose.model('FLOODUPDATES',floodupdatesschema);
exports.validateflooddata=validateflooddata;