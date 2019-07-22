const express = require('express');

const routes = express.Router(); // return a core.Router to configure routes

routes.get('/',(req,res) => {   
    res.send('Getting User');
})

routes.post('/save',(req,res) => {
    res.send('Added a new user');
})

routes.put('/update',(req,res) => {
    res.send('Updating a user');
})

routes.delete('/delete',(req,res) => {
    res.send('Deleting a user');
})

module.exports = routes;