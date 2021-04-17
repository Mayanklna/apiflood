var express     = require('express');
var mongoose    = require('mongoose');
var multer      = require('multer');
var path        = require('path');
var csvModel    = require('./models/csv');
var csv         = require('csvtojson');
var bodyParser  = require('body-parser');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var uploads = multer({storage:storage});

//connect to db
mongoose.connect('mongodb+srv://alok:alokmongodb@21@cluster0.aaovc.mongodb.net/Floodsatsearch?retryWrites=true&w=majority',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

//init app
var app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static(path.resolve(__dirname,'public')));

//default pageload
app.get('/flood',(req,res)=>{
    csvModel.find((err,data)=>{
         if(err){
             console.log(err);
         }else{
              if(data!=''){
                //   res.send(data);
                res.render('demo',{data:data});
              }else{
                  res.render('demo',{data:''});
              }
         }
    });
});

var temp ;

app.post('/',uploads.single('csv'),(req,res)=>{
 //convert csvfile to jsonArray   
csv()
.fromFile(req.file.path)
.then((jsonObj)=>{
    console.log(jsonObj);
    const flood = new csvModel({
        floodname:req.body.floodname,
        flooddata : jsonObj
       
    })
    flood.save(flood).then(data => {
        // res.send(data)
     res.redirect('/');
    })
    .catch( (error) =>{
        res.status(500).send({
            message : error.message || "Some error occurred while creating a create operation"
        });
    });
      
   });
});

//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));