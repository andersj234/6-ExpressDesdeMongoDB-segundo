const express = require("express")
const app = express()
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient

let db;

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client){
  err
  ? console.log(err)
  : (db = client.db("series"))
})

app.get("/api/series", function(req,res){
  db.collection("series").find().toArray(function(error, data){
    error
    ? res.send({error: true, contenido: error})
    : res.send({error: false, contenido: data})
  })
})

app.get("/api/serie", function(req,res){
  db.collection("series").find({titulo: {$regex: `${req.query.titulo}`}}).toArray(function(error, data){ //para buscar una sola quitale el regex
    error
    ? res.send({error: true, contenido: error})
    : res.send({error: false, contenido: data})
  })
})

app.post("/api/nuevaSerie", function(req,res){
  db.collection("series").insertOne(req.body, function(error, data){ 
    error
    ? res.send({error: true, contenido: error})
    : res.send({error: false, contenido: data})
  })
})

app.listen(3000)