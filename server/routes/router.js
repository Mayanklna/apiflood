const express = require('express');
const route = express.Router()
const  Flooddb=require('../model/model')
const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);
route.get('/flooddata',(req, res) => {
 Flooddb.find().then((flooddata)=>{res.send(flooddata)}).catch((error)=>{
        res.status(500).send("something went wrong");
    })
    
});
/**
 *  @description add flood
 *  @method GET /add-flood
 */
route.get('/add-flood', services.add_flood)

/**
 *  @description for update flood
 *  @method GET /update-flood
 */
route.get('/update-flood', services.update_flood)


// API
route.post('/api/flood', controller.create);
route.get('/api/flood', controller.find);
route.put('/api/flood/:id', controller.update);
route.delete('/api/flood/:id', controller.delete);


module.exports = route