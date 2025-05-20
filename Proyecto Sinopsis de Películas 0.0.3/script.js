//BOTONES
const btnAñadirPeli = document.getElementById("btnAgregarPelicula");
const btnCancelarAdd = document.getElementById("btnCancelEdit");
const btnAñadirEdit = document.getElementById("btnAñadirEdit");
const filaStyleElm = document.querySelectorAll(".filaStyle");

//ELEMENTOS CONTENEDORES
const contNuevaPeli = document.getElementById("nuevaEditPeliCont");
const oscurecedor = document.getElementById("oscurecedor");
const contListaPelis = document.getElementById("contListaPelis");
const previewImg = document.getElementById('previewImg')

//INPUTS
const inputTitulo = document.getElementById("inputTitulo");
const inputMiniResena = document.getElementById("inputMiniresId");
const inputResena = document.getElementById("inputResId");
const inputYear = document.getElementById("inputYear");
const inputGenre = document.getElementById("inputGenre");
const inputRating = document.getElementById("inputRating");
const inputImg = document.getElementById("imageupload");


//-----------------------------------------------------------------------

function btnAñadirPelicula() {
  contNuevaPeli.style.display = "flex";
  oscurecedor.style.display = "block";

  inputTitulo.value = "";
  inputMiniResena.value = "";
  inputResena.value = "";
  inputYear.value = "";
  inputGenre.value = "";
  inputRating.value = "";
}

function cancelarAñadirPeli() {
  contNuevaPeli.style.display = "none";
  oscurecedor.style.display = "none";
}

function añadirPelicula() {
  if (
    !inputTitulo.value.trim() ||
    !inputMiniResena.value.trim() ||
    !inputResena.value.trim() ||
    !inputResena.value.trim()
  ) {
    console.log("No hay datos");
    return;
  }

  const readerImg = new FileReader();
  const archivoImg = inputImg.files[0];

  if (archivoImg) {
    readerImg.readAsDataURL(archivoImg);

    readerImg.onload = function () {
      const imgSubida = readerImg.result;

      const pelicula = {
        titulo: `${inputTitulo.value}`,
        miniResena: `${inputMiniResena.value}`,
        resenaCompleta: `${inputResena.value}`,
        year: `${inputYear.value}`,
        calificacion: "10/10",
        urlImg: "",
        genero: `${inputGenre.value}`,
        img: imgSubida,
      };

      peliculasAñadidas.push(pelicula);

      añadirPeliALista(pelicula);

      contNuevaPeli.style.display = "none";
      oscurecedor.style.display = "none";

      console.log("Pelicula Añadida!");
      console.log(`${JSON.stringify(pelicula)}`);
      console.log("pelis Añadidas:", `${JSON.stringify(peliculasAñadidas)}`);
    };

    readerImg.onerror = function(){
        console.log('Error al leer la img');  
    }
  }else{
         const pelicula = {
        titulo: `${inputTitulo.value}`,
        miniResena: `${inputMiniResena.value}`,
        resenaCompleta: `${inputResena.value}`,
        year: `${inputYear.value}`,
        calificacion: "10/10",
        urlImg: "",
        genero: `${inputGenre.value}`,
        img: "",
      };

      peliculasAñadidas.push(pelicula);

      añadirPeliALista(pelicula);

      contNuevaPeli.style.display = "none";
      oscurecedor.style.display = "none";

      console.log("Pelicula Añadida!");
      console.log(`${JSON.stringify(pelicula)}`);
      console.log("pelis Añadidas:", `${JSON.stringify(peliculasAñadidas)}`);

  }
}



function añadirPeliALista(pelicula) {
  const titulo = pelicula.titulo;
  const miniResena = pelicula.miniResena;
  const genero = pelicula.genero;
  const rating = pelicula.calificacion;

  //Creando una nueva FILA
  const nuevaFilaPeli = document.createElement("div");
  nuevaFilaPeli.classList.add("filaPeli", "peliculaCard");

  //1 Nuevo TÍTULO
  const nuevoTitle = document.createElement("h3");
  nuevoTitle.classList.add("nombrePeli", "filaStyle");
  nuevoTitle.innerHTML = titulo;

  //2 Nueva MINI RESEÑA
  const nuevaMiniRes = document.createElement("p");
  nuevaMiniRes.innerHTML = miniResena;
  nuevaMiniRes.classList.add("miniReseña", "filaStyle");

  //3 Nueva IMAGEN
  const nuevaImgCont = document.createElement("div");
  nuevaImgCont.classList.add("imgPeliCont", "filaStyle");

  const nuevaImgPeli = document.createElement("img");
  nuevaImgPeli.classList.add("imgPeliElm");
  nuevaImgPeli.src = "img/inception_ver12_xlg.jpg";
  nuevaImgCont.appendChild(nuevaImgPeli);

  //4 Nuevo GENERO
  const nuevoGenero = document.createElement("div");
  nuevoGenero.innerHTML = genero;
  nuevoGenero.classList.add("genero", "filaStyle");

  //5 Nueva CALIFICACION
  const nuevoRating = document.createElement("div");
  nuevoRating.innerHTML = rating;
  nuevoRating.classList.add("rating", "filaStyle");

  nuevaFilaPeli.appendChild(nuevoTitle);
  nuevaFilaPeli.appendChild(nuevaMiniRes);
  nuevaFilaPeli.appendChild(nuevaImgCont);
  nuevaFilaPeli.appendChild(nuevoGenero);
  nuevaFilaPeli.appendChild(nuevoRating);

  contListaPelis.appendChild(nuevaFilaPeli);
}

btnAñadirPeli.addEventListener("click", () => {
  btnAñadirPelicula();
});

btnCancelarAdd.addEventListener("click", () => {
  cancelarAñadirPeli();
});

btnAñadirEdit.addEventListener("click", () => {
  añadirPelicula();
});

inputImg.addEventListener('change', (e) =>{
    const file = e.target.files[0];

    if(file){
        const reader= new FileReader();

        reader.addEventListener('load', () =>{
            previewImg.src= reader.result
        })

        reader.readAsDataURL(file);
    }
})
