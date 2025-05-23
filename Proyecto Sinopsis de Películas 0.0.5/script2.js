const btnEliminarDetail= document.getElementById('btnEliminarDetail')
const btnEditarDetail = document.getElementById('btnEditarDetail')

btnEliminarDetail.addEventListener("click", () =>{
    console.log("Eliminando Pela");
    const nombrePeli= peliculaChequeadaTemp;
    eliminarPelicula(nombrePeli);
    cancelarVistaDetail()
    localStorage.setItem("peliculas", JSON.stringify(peliculasAñadidas))
    
})

function eliminarPelicula(pelicula){
const nombrePeli= pelicula

const peliculaAEliminar = peliculasAñadidas.find(p =>
    p.titulo === nombrePeli
) // SI SE USA {} SIEMPRE debe haber RETURN

peliculasAñadidas = peliculasAñadidas.filter(p => p.titulo !== nombrePeli)
console.log(`${JSON.stringify(peliculaAEliminar)}`);
}

function InitEditarPelicula(nombrePeli){
const peliAEditar= peliculasAñadidas.find((peli) => peli.titulo === nombrePeli)
inputTitulo.value = peliAEditar.titulo
inputSinopsis.value = peliAEditar.sinopsis

opcionesVista.forEach((o) => {
    const valorPeli= peliAEditar.vista.toLowerCase().replace("í","i")
    if(o.value === valorPeli){
        o.checked = true;
    }else{
        o.checked = false;
    }
    
})

inputGenre.value = peliAEditar.genero;
inputRating.value = peliAEditar.calificacion;
inputYear.value = peliAEditar.year;
previewImg.src = peliAEditar.img


}

btnEditarDetail.addEventListener("click", ()=>{

    console.log("Editando peli");
    modoAddEdit= "edit"
    oscurecedor.style.display = "block";
    VistaDetail.style.display = "none";
    contNuevaPeli.style.display = "flex";
    InitEditarPelicula(peliculaChequeadaTemp)
})

