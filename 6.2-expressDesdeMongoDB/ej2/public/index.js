let librosLocal = [];
function mostrarLista() {
  fetch("/api/libros")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        document.getElementById(
          "feedback"
        ).innerHTML = `<h3>Ha habido un error</h3>`;
      } else {
        console.log(datos);
        imprimir(datos);
      }
    });
}

function buscar() {
  fetch(`/api/libro/${document.getElementById("buscar").value}`)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      datos.error
        ? (document.getElementById(
            "feedback"
          ).innerHTML = `<h3>ha ocurrido un error</h3>`)
        : imprimir(datos);
    });
}

function anyadir() {
  fetch(`api/nuevoLibro/${document.getElementById("anyadir").value}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      datos.error
        ? (document.getElementById(
            "feedback"
          ).innerHTML = `<h3>no se ha guardado correctamente</h3>`)
        : (document.getElementById(
            "feedback"
          ).innerHTML = `<h3>se ha guardado: ${datos.contenido.ops[0].titulo}</h3>`);
      mostrarLista();
    });
}

function cambiar(i) {
  fetch(`api/editarLibro/${librosLocal[i].titulo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        document.getElementById(
          "feedback"
        ).innerHTML = `<h3>ha ocurrido un error</h3>`;
      } else {
        datos.contenido.result.nModified > 0
          ? (document.getElementById(
              "feedback"
            ).innerHTML = `<h3>se ha marcado libro como leido</h3>`)
          : (document.getElementById(
              "feedback"
            ).innerHTML = `<h3>no se ha marcado ningun libro como leido</h3>`);
        mostrarLista();
      }
      mostrarLista();
    });
}

function borrar(i) {
  fetch(`/api/borrarLibro/${librosLocal[i].titulo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      if (datos.error) {
        document.getElementById(
          "feedback"
        ).innerHTML = `<h3>ha ocurrido un error</h3>`;
      } else {
        datos.contenido.deletedCount > 0
          ? (document.getElementById(
              "feedback"
            ).innerHTML = `<h3>se ha borrado correctamente</h3>`)
          : (document.getElementById(
              "feedback"
            ).innerHTML = `<h3>no se ha encontrado el libro</h3>`);
      }
      mostrarLista();
    });
}
function imprimir(datos) {
  librosLocal = datos.contenido;
  let parrafo = "";
  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${
      datos.contenido[i].estado ? "leido" : "sin leer"
    }</td><td><button onclick="cambiar(${i})">leido</button></td><td><button onclick="borrar(${i})">borrar</button></td></tr>`; // accede al indice de cada uno que se forma y despues trabajo con ellos
  }
  document.getElementById(
    "libros"
  ).innerHTML = `<table><th>titulo:</th><th>estado:</th>${parrafo}</table>`;
}
