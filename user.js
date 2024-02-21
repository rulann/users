const express= require('express')

var app= express();

var fs = require('fs')

app.get('/',function(req,res)
{

    res.send("start server")
})

app.get('/listUsers',function(req,res)
{
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    res.send(String(data))
})

app.get('/user/:id',function(req,res){
    var arr =["1", "2", "3"]

    if (arr.includes(String(req.params.id))){
        var data= fs.readFileSync(__dirname+"/users.json") //as byte
        data= JSON.parse(String(data))
        var user = data['user'+req.params.id]
        res.send(user)
    }
    else
      res.send("user not foud")
})

app.delete('/deleteUser/:id',function(req,res)
{
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    //var user = data['user'+req.params.id]
    delete  data['user'+req.params.id]
    res.send(data)
})

app.get('/form', function(req, res){
    res.sendFile(__dirname + '/adduser.html');
})

var bodyParser = require( 'body-parser' );
var urlEncoded = bodyParser.urlencoded({extended: false})

app.post('/addUser', urlEncoded, function(req,res)
{
    var newUser={name:"", password:"", profession:""}

    newUser.name=req.body.name
    newUser.password=req.body.psw
    newUser.profession=req.body.job

    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    data['user'+Object.keys(data).length+1]= newUser
    res.send(data)
})

var server= app.listen(9000, function()
{
    var host = server.address().address
    var port= server.address().port
})