mostrarLista()
function mostrarLista(){
    fetch(`/api/series`).then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
        datos.error
        ? document.getElementById("feedback").innerHTML =`<h3>ha surgido un error</h3>`
        : imprimir(datos)
    })
}

function buscar(){
    fetch(`/api/serie/?titulo=${document.getElementById("titulo").value}`).then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
        datos.error
        ? document.getElementById("feedback").innerHTML =`<h3>ha surgido un error</h3>`
        : imprimir(datos)
    })
}

function anyadir(){

    fetch(`api/nuevaSerie`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            titulo: document.getElementById("tituloNuevo").value,
            plataforma: document.getElementById("plataformaNueva").value,
            puntuacion: parseInt(document.getElementById("puntuacion").value),
        })
    }).then(function(respuesta){
        return respuesta.json()
    }).then(function(datos){
        datos.insertedCount <= 1
        ? document.getElementById("feedback").innerHTML = `<h3>ha surgido un error</h3>`
        : (document.getElementById("feedback").innerHTML = `<h3>se ha grabado correctamente</h3>`,  mostrarLista())
        
    })
}
function imprimir(datos){ 
    let parrafo =""
    for (let i = 0; i < datos.contenido.length; i++) {
        parrafo += `<tr><td>${datos.contenido[i].titulo}</td><td>${datos.contenido[i].plataforma}</td><td>${datos.contenido[i].puntuacion}</td></tr>`
    }
    document.getElementById("contenido").innerHTML =`<table><th>titulo</th><th>plataforma</th><th>puntuación</th>${parrafo}</table>`
}
