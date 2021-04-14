var Flooddb = require('../model/model');

// create and save new flood
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new flood
    const flood = new Flooddb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save flood in the database
    flood
        .save(flood)
        .then(data => {
            //res.send(data)
            res.redirect('/add-flood');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all floods/ retrive and return a single flood
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Flooddb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found flood with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving flood with id " + id})
            })

    }else{
       Flooddb.find()
            .then(flood => {
                res.send(flood)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving flood information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
   Flooddb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update flood with ${id}. Maybe flood not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update flood information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

   Flooddb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Flood was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Flood with id=" + id
            });
        });
}