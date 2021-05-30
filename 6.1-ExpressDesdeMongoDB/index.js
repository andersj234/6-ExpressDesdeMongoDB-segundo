const express = require("express");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const app = express();

let db;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

MongoClient.connect(
  "mongodb://127.0.0.1:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    err ? console.log(err) : (db = client.db("mesas"));
  }
);

app.get("/api/mesas", function (req, res) {
  db.collection("mesas")
    .find()
    .toArray(function (error, datos) {
      if (error !== null) {
        res.send({ error: true, mensaje: error });
      } else {
        res.send({ error: false, contenido: datos });
      }
    });
});

app.post("/api/anyadir", function (req, res) {
  /*  let mesa = {
    tamanyo: req.body.tamanyo,
    material: req.body.material,
    color: req.body.color,
    patas: req.body.patas,
  }; */
  db.collection("mesas").insertOne(
    {
      tamanyo: req.body.tamanyo,
      material: req.body.material,
      color: req.body.color,
      patas: parseInt(req.body.patas),
    },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ error: true, mensaje: error });
      } else {
        res.send({ error: false, mensaje: datos });
      }
    }
  );
});

app.put("/api/modificar/:color", function (req, res) {
  db.collection("mesas").updateMany(
    { color: req.params.color },
    { $set: { color: "Granate" } },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ error: true, mensaje: error });
      } else {
        res.send({ error: false, mensaje: datos });
      }
    }
  );
});

app.delete("/api/borrar/:patas", function (req, res) {  // no se porque no me deja borrarlos cuando en la base de datos ya los he puesto como integer 32 y las patas estan parseadas a integer
  db.collection("mesas").deleteMany(
    { patas: parseInt(req.params.patas) },
    function (error, datos) {
      if (error !== null) {
        console.log(error);
        res.send({ error: true, mensaje: error });
      } else {
        res.send({ error: false, mensaje: datos });
      }
    }
  );
});

app.listen(3000);