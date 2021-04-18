var express     = require('express');
var mongoose    = require('mongoose');
var multer      = require('multer');
var path        = require('path');
var fs=require('fs');
var Flooddb = require('./server/model/model');
const  weblinkmodel = require('./server/model/weblinkmodel');
var csv         = require('csvtojson');
var bodyParser  = require('body-parser');
const { response } = require('express');

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
//init app
var app = express();
var uploads = multer({storage:storage});
require('dotenv').config();
//connect to db
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},{ useUnifiedTopology: true })
.then(()=>console.log('connected to db'))
.catch((err)=>console.log(err))

 

//set the template engine
app.set('view engine','ejs');
app.use('/', require('./server/routes/router'))
//fetch data from the request
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept');
        next();
      }); 
//static folder
app.use(express.static(path.resolve(__dirname,'public')));
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
//default pageload
 

var temp ;

app.post('/api/flood',uploads.single('csv'), async (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }  
 
 //convert csvfile to jsonArray   
csv()
.fromFile(req.file.path)
.then((jsonObj)=>{
    console.log(jsonObj);
    const flood = new Flooddb({
        floodname:req.body.floodname,
        StartDate : req.body.StartDate,
        EndDate: req.body.EndDate,
       CountryName : req.body.CountryName,
       SatelliteName : req.body.SatelliteName,
        flooddata : jsonObj
       
    })
      
    flood.save(flood).then(data => {
        // res.send(data)
   
   ("./" + fs.unlinkSync(req.file.path));
     res.redirect('/');
    })
    .catch( (error) =>{
        res.status(500).send({
            message : error.message || "Some error occurred while creating a create operation"
        });
    });
      
   });
   
});
app.post('/api/link',  (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
 
    // new link
    const link = new weblinkmodel({
        weblink:req.body.weblink,
        StartDate : req.body.StartDate,
        EndDate: req.body.EndDate,
       CountryName : req.body.CountryName
        
       
    })
 
    // save flood in the database
    link.save(link)
        .then(data => {
            //  res.send(data)
             res.redirect('/');
        })
        .catch( (error) =>{
            res.status(500).send({
                message : error.message || "Some error occurred while creating a create operation"
            });
        });

});
app.put('/api/flood/:id',async (req, res)=>{
    if(!req.body){
        return res.status(400).send({ message : "Data to update can not be empty"})
    }

        const id = req.params.id;
      await Flooddb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Update flood with ${id}. Maybe flood not found!`})
                }else{
                    res.send(data);
                }
            })
            .catch(err =>{
                res.status(500).send({ message : "Error Update flood information"})
            })
           
    })
  
app.put('/api/link/:id',async (req, res)=>{
    if(!req.body){
        return res.status(400).send({ message : "Data to update can not be empty"})
    }

        const id = req.params.id;
      await weblinkmodel.findByIdAndUpdate(id, req.body, {useFindAndModify:false}  )
            .then(data => {
                if(!data){
                    res.status(404).send({ message : `Cannot Update link with ${id}. Maybe flood not found!`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message : "Error Update link information"})
            })
            if(!req.body){
                return res.status(400).send({ message : "Data to update can not be empty"})
            }
    });  
//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port '+port));