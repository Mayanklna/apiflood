var Flooddb = require('../model/model');
var Weblinkdb = require('../model/weblinkmodel');

// create and save new flood

// exports.create = async (req,res)=>{
//     if(!req.body){
//         res.status(400).send({ message : "Content can not be emtpy!"});
//         return;
//     }
 
//     // new link
//     const flood = new Weblinkdb({
//         weblink  : req.body.weblink,
//         StartDate : req.body.StartDate,
//         EndDate: req.body.EndDate,
//         CountryName : req.body.CountryName
        
//     })

//     // save flood in the database
//     flood
//         .save(flood)
//         .then(data => {
//             // res.send(data)
//          res.redirect('/add-flood');
//         })
//         .catch( (error) =>{
//             res.status(500).send({
//                 message : error.message || "Some error occurred while creating a create operation"
//             });
//         });

// }

// retrieve and return all floods/ retrive and return a single flood
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Flooddb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send(error)
                    console.log(error);
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving flood with id " + id })
            })

 

    } else {
        Flooddb.find()
            .then(flood => {
                res.send(flood)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving flood information" })
            })
      
    }


}

// exports.find = (req, res) => {

//     if (req.query.id) {
//         const id = req.query.id;

        
//         Weblinkdb.findById(id)
//             .then(link => {
//                 if (!link) {
//                     res.status(404).send(errorr)
//                     console.log(errorr);
//                 } else {
//                     res.send(link)
//                 }
//             })
//             .catch(errr => {
//                 res.status(500).send({ message: "Erro retrieving weblink with id " + id })
//             })

//     } else {
//       Weblinkdb.find()
//             .then(links=> {
//                 res.send(links)
//             })
//             .catch(err => {
//                 res.status(500).send({ message: err.message || "Error Occurred while retriving link information" })
//             })
     
//     }


// }

// Update a new idetified flood by flood id
// exports.update = async (req, res)=>{


//     const id = req.params.id;
//   await Weblinkdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false}  )
//         .then(data => {
//             if(!data){
//                 res.status(404).send({ message : `Cannot Update link with ${id}. Maybe flood not found!`})
//             }else{
//                 res.send(data)
//             }
//         })
//         .catch(err =>{
//             res.status(500).send({ message : "Error Update link information"})
//         })
//         if(!req.body){
//             return res.status(400).send({ message : "Data to update can not be empty"})
//         }
// }

// Delete a user with specified flood id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Flooddb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Flood was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Flood with id=" + id
            });
        });
       
     
}
// exports.delete = (req, res) => {
//     const id = req.params.id;

 
//         Weblinkdb.findByIdAndDelete(id)
//         .then(link => {
//             if (!link) {
//                 res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
//             } else {
//                 res.send({
//                     message: "Link was deleted successfully!"
//                 })
//             }
//         })
//         .catch(errr => {
//             res.status(500).send({
//                 message: "Could not delete Link with id=" + id
//             });
//         });
     
// }