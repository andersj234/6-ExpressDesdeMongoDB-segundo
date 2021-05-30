mostrarMesas();

function mostrarMesas() {
  let parrafo = "";
  fetch("/api/mesas")
    .then((res) => res.json())
    .then(function (respuesta) {
      for (let i = 0; i < respuesta.contenido.length; i++) {
        parrafo += `<tr><td>${respuesta.contenido[i].tamanyo}</td><td>${respuesta.contenido[i].material}</td><td>${respuesta.contenido[i].color}</td><td>${respuesta.contenido[i].patas}</td></tr>`;
      }
      document.getElementById(
        "resu"
      ).innerHTML = `<table class="blueTable"><tr><th>Tamaño:</th><th>Material:</th><th>Color:</th><th>Patas:</th></tr>${parrafo}</table>`;
    });
}

function anyadir() {
  let mesa = {
    tamanyo: document.getElementById("tamanyo").value,
    material: document.getElementById("material").value,
    color: document.getElementById("color").value,
    patas: parseInt(document.getElementById("patas").value),
  };

  fetch("/api/anyadir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mesa),
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? feedback("Ha habido un error")
        : feedback("Grabado correctamente"),
        mostrarMesas();
    });
}

function modificar() {
  let colorModificar = document.getElementById("colorModificar").value;
  fetch(`/api/modificar/${colorModificar}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? feedback("Ha habido un error")
        : feedback("Modificado correctamente"),
        mostrarMesas();
    });
}

function borrar() {
  fetch(`/api/borrar/${document.getElementById("patasBorrar").value}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      datos.error
        ? feedback("Ha habido un error")
        : feedback(`Eliminados ${datos.mensaje.deletedCount} registros`),
        mostrarMesas();
    });
}

function feedback(string) {
  document.getElementById("feedback").innerHTML = `<p>${string}</p>`;
}