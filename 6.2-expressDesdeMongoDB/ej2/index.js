const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error, client) {
    error ? console.log(error) : (db = client.db("libros"));
  }
);

app.get("/api/libros", function (req, res) {
  db.collection("libros")
    .find()
    .toArray(function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    });
});

app.get("/api/libro/:titulo", function (req, res) {
  db.collection("libros")
    .find({ titulo: { $regex: `${req.params.titulo}` } })
    .toArray(function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    });
});

app.post("/api/nuevoLibro/:titulo", function (req, res) {
  db.collection("libros").insertOne(
    { titulo: req.params.titulo, estado: false },
    function (error, datos) {
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    }
  );
});

app.put("/api/editarLibro/:titulo", function (req, res) {
  db.collection("libros").updateOne(
    { titulo: req.params.titulo },
    { $set: { estado: true } },
    function (error, datos) {
      // recuerda que tienes un updateOne y solo te cambiara el primero que encuentre por ejemplo con patata tenias 2 y solo te cambiaba el primero por eso
      error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });
    }
  );
});

app.delete("/api/borrarLibro/:titulo", function(req, res){
    db.collection("libros").deleteOne({titulo: req.params.titulo}, function( error, datos){
        error
        ? res.send({ error: true, contenido: error })
        : res.send({ error: false, contenido: datos });   
    })
})

app.listen(process.env.PORT || 3000);
