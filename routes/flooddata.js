const express=require('express');
const router=express.Router();
const {FLOODUPDATES,validateflooddata}=require('../models/flooddata')
//Create a new post
router.post('/',async (req,res)=>{
    const  error =await validateflooddata(req.body);
   if(error.message){res.status(400).send(error.message);}
   
   flood=new FLOODUPDATES({
    StartDate:req.body.myStartDate,
    EndDate:req.body.myEndDate,
    CountryName:req.body.myCountryName,
    SatelliteName:req.body.mySatelliteName,
    FloodCSVData:req.body.myFloodCSVData
    });
    flood.save().then((flood)=>{
        res.send(flood)

    }).catch((error)=>{
        res.status(500).send("flood was not stored in database")
    })
})
//get all floods

router.get('/',(req,res)=>{
    FLOODUPDATES.find().then((flooddata)=>{res.send(flooddata)}).catch((error)=>{
        res.status(500).send("something went wrong");
    })
})
//get the specific  flood
router.get("/:floodid",async(req,res)=>{
    const flood=await FLOODUPDATES.findById(req.params.floodid) 
        if(!flood) res.status(404).send("flood not found"); 

        res.send(flood);
    
}) 

//update the specific  flood
router.put("/:floodid",async(req,res)=>{
    const updateflood=await FLOODUPDATES.findByIdAndUpdate(req.params.floodid,{
        StartDate:req.body.myStartDate,
        EndDate:req.body.myEndDate,
        CountryName:req.body.myCountryName,
        SatelliteName:req.body.mySatelliteName,
        FloodCSVData:req.body.myFloodCSVData
      },{new:true}) 
        if(!updateflood) res.status(404).send("flood not found"); 

        res.send(updateflood);
    
}) 
//delete the specific flood
router.delete("/:floodid",async(req,res)=>{
    const deleteflood=await FLOODUPDATES.findByIdAndRemove(req.params.floodid) 
        if(!deleteflood) res.status(404).send("flood not found"); 

        res.send(deleteflood);
    
}) 
module.exports=router;