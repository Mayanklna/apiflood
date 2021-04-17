const express = require('express');
const route = express.Router()
var Flooddb = require('../model/model');
const services = require('../services/render');
const controller = require('../controller/controller');
var Weblinkdb = require('../model/weblinkmodel');
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);
route.get('/flooddata', async (req, res) => {
 
    try{ 
        const cases=await Flooddb.find({})
        res.send(cases)
      
          }
          catch(e){
              res.status(500).send(e)
          }
});
route.get('/weblinks', async (req, res) => {
 
    try{ 
        const links=await Weblinkdb.find({})
        res.send(links)
      
          }
          catch(e){
              res.status(500).send(e)
          }
});
/**
 *  @description add flood
 *  @method GET /add-flood
 */
route.get('/add-flood', services.add_flood)
route.get('/floodlist-weblink', services.floodlistweblink)
/**
 *  @description for update flood
 *  @method GET /update-flood
 */
route.get('/update-flood', services.update_flood)


// API
//flood
route.get('/api/flood', controller.find);
// route.put('/api/flood/:id', controller.update);
route.delete('/api/flood/:id', controller.delete);
//Link
// route.post('/api/weblink', controller.create);
// route.get('/api/weblink', controller.find);
// route.put('/api/weblink/:id', controller.update);
// route.put('/api/weblink/:id', controller.delete);




module.exports = route