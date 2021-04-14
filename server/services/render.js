const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/floods
    axios.get('http://localhost:3000/api/flood')
        .then(function(response){
            res.render('index', { floods : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_flood = (req, res) =>{
    res.render('add_flood');
}

exports.update_flood = (req, res) =>{
    axios.get('http://localhost:3000/api/flood', { params : { id : req.query.id }})
        .then(function(flooddata){
            res.render("update_flood", { flood : flooddata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}