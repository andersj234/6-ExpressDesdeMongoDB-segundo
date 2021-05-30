
mostrar();
let localMenus = []

function mostrar() {
  fetch("/api/menus")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      datos.error
      ? document.getElementById("feedback").innerHTML =`<h3>ha habido un fallo</h3>`
      :imprimir(datos);
      (localMenus =datos.contenido);
    });
}

function anyadir(){

    let menu= {
        numeroDeMenu: document.getElementById("menu").value,
        primerPlato: document.getElementById("primerPlato").value,
        postre: document.getElementById("postre").value,
        segundoPlato: document.getElementById("segundoPlato").value,
        precio: document.getElementById("precio").value,
    }
    fetch("/api/nuevoMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(menu),
      }).then(function(respuesta){
          return respuesta.json()
      }).then(function(datos){
          if(datos.error){
              document.getElementById("feedback").innerHTML =`<h3>Ha surgido un error</h3>`
          }else{
              mostrar()
          }
      })
}

function editar(indice){
      document.getElementById("menu").value= localMenus[indice].numeroDeMenu
      document.getElementById("primerPlato").value= localMenus[indice].primerPlato
      document.getElementById("postre").value= localMenus[indice].postre
      document.getElementById("segundoPlato").value= localMenus[indice].segundoPlato
      document.getElementById("precio").value= localMenus[indice].precio
}
function editarFinal(){
  fetch("/api/editarMenu", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
     numeroDeMenu: document.getElementById("menu").value,
     primerPlato: document.getElementById("primerPlato").value,
     postre: document.getElementById("postre").value,
     segundoPlato: document.getElementById("segundoPlato").value,
     precio: document.getElementById("precio").value
    })
  }).then(function(respuesta){
      return respuesta.json()
  }).then(function(datos){
      datos.contenido.modifiedCount >= 1
      ? (document.getElementById("feedback").innerHTML =`<h3>editado correctamente</h3>`, mostrar())
      : document.getElementById("feedback").innerHTML =`<h3>no se ha editado bien</h3>`
  })
}

function borrar(indice){
fetch("/api/borrarMenu", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify ({numeroDeMenu: localMenus[indice].numeroDeMenu,})
  }).then(function(respuesta){
      return respuesta.json()
  }).then(function(datos){
    datos.contenido.deletedCount >= 1
    ? (document.getElementById("feedback").innerHTML =`<h3>borrado correctamente</h3>`, mostrar())
    : document.getElementById("feedback").innerHTML =`<h3>no se ha borrado bien</h3>`
  })
}

function imprimir(datos){
  let parrafo = "";
      for (let i = 0; i < datos.contenido.length; i++) {
        parrafo += `<tr><td>${datos.contenido[i].numeroDeMenu}</td><td>${datos.contenido[i].primerPlato}</td><td>${datos.contenido[i].postre}</td><td>${datos.contenido[i].segundoPlato}</td><td>${datos.contenido[i].precio}</td><td><button onclick="editar(${i})">editar</button></td><td><button onclick="borrar(${i})">borrar</button></td></tr>`;
      }
      document.getElementById(
        "contenido"
      ).innerHTML = `<table><th>numero de menú:</th><th>primer plato:</th><th>postre:</th><th>segundo plato:</th><th>precio:</th>${parrafo}</table>`;
}