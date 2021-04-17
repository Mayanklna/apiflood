const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/floods
    axios.get('http://127.0.0.1:3000/api/flood')
        .then(function(response){
           // res.send(response);
            res.render('index', { floods : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_flood = (req, res) =>{
    res.render('add_flood');
}
exports.floodlistweblink = (req, res) =>{
    res.render('floodlist-weblink');
}
exports.update_flood = (req, res) =>{
    axios.get('http://127.0.0.1:3000/api/flood', { params : { id : req.query.id }})
        .then(function(response1){
            res.render("update_flood", { flood : response1.data})
        })
        .catch(err =>{
            res.send(err);
        })
}