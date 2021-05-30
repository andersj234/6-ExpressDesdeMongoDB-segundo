const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let db;

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    error ? console.log(error) : (db = client.db("restaurante"));
  }
);

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/menus", function (req, res) {
  db.collection("restaurante")
    .find()
    .toArray(function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    });
});

app.post("/api/nuevoMenu", function (req, res) {

  db.collection("restaurante").insertOne(
    {
      numeroDeMenu: parseFloat(req.body.numeroDeMenu),
      primerPlato: req.body.primerPlato,
      postre: req.body.postre,
      segundoPlato: req.body.segundoPlato,
      precio: parseInt(req.body.precio),
    },
    function (error, datos) {
      if (error !== null) {
        res.send({ error: true, contenido: error });
      } else {
        res.send({ error: false, contenido: datos });
      }
    }
  );
});

app.put("/api/editarMenu", function (req, res) {
  db.collection("restaurante").updateOne(
    { numeroDeMenu: parseInt(req.body.numeroDeMenu) },
    {
      $set: {
        precio: parseFloat(req.body.precio),
        primerPlato: req.body.primerPlato,
        postre: req.body.postre,
        segundoPlato: req.body.segundoPlato,
      },
    },
    function (error, data) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: data });
    }
  );
});


app.delete("/api/borrarMenu", function(req,res){
  db.collection("restaurante").deleteOne({numeroDeMenu: req.body.numeroDeMenu}, function(error, data){
    error
    ? res.send({ error: true, contenido: error })
    : res.send({ error: false, contenido: data });
  })
})
app.listen(3001);
