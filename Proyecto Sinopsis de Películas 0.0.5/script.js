//BOTONES
const btnAñadirPeli = document.getElementById("btnAgregarPelicula");
const btnCancelarAdd = document.getElementById("btnCancelEdit");
const btnAñadirEdit = document.getElementById("btnAñadirEdit");
const filaStyleElm = document.querySelectorAll(".filaStyle");
const btnCancelDetail = document.getElementById("btnVolverDetail");

//ELEMENTOS CONTENEDORES
const contNuevaPeli = document.getElementById("nuevaEditPeliCont");
const oscurecedor = document.getElementById("oscurecedor");
const ListaPelis = document.getElementById("listaPeliculas");
const previewImg = document.getElementById("previewImg");
const VistaDetail = document.getElementById("vistaDetalleCont");

const tituloDetailPeli = document.querySelector(".tituloDetailPeli");
const sinopsisTxtDetail = document.getElementById("sinopsisTextID");
const genreDetailText = document.getElementById("genreDetailtxt");
const yearDetailTxt = document.getElementById("yearDetailTxt");
const detailImg = document.querySelector(".detailImg");
const vistaDetailtxt = document.getElementById("vistaDetailtxt");

//INPUTS
const inputTitulo = document.getElementById("inputTitulo");
const inputSinopsis = document.getElementById("inputSinopsisId");
const inputYear = document.getElementById("inputYear");
const inputGenre = document.getElementById("inputGenre");
const inputRating = document.getElementById("inputRating");
const inputImg = document.getElementById("imageupload");
const inputUrl = document.getElementById("inputUrl");
let inputVista;
let peliculaChequeadaTemp;
let modoAddEdit = "";

//LISTENER PARA ABRIR VISTA DETALLE EN C/FILA DE PELICULA

function listenerVistaDetalle() {
  const peliculaCards = document.querySelectorAll(".peliculaCard");
  peliculaCards.forEach((p) => {
    p.addEventListener("click", () => {
      console.log("Click!!!!!!!");
      const tarjetaSel = p.querySelector(".nombrePeli");
      const nombrePelicula = tarjetaSel.textContent;
      peliculaChequeadaTemp = nombrePelicula;
      console.log(`${nombrePelicula}`);

      //Buscar la película en el Array
      const peliculaEncontrada = peliculasAñadidas.find(
        (peli) => peli.titulo === nombrePelicula
      );
      mostrarVistaDetail(peliculaEncontrada);
    });
  });
}
//CARGAR DATOS DE PELICULAS

const dataGuardada = localStorage.getItem("peliculas");

if (dataGuardada) {
  peliculasAñadidas = JSON.parse(dataGuardada);
  peliculasAñadidas.forEach((p) => añadirPeliALista(p));

  listenerVistaDetalle();
} else {
  peliculasAñadidas.forEach((p) => añadirPeliALista(p));
  listenerVistaDetalle();
}

//AJUSTAR PARRAFOS DE SINOPSIS
function ajustarP() {
  const pMiniRes = document.querySelectorAll(".sinopsis");
  const maxChars = 160;

  pMiniRes.forEach((p) => {
    let textoMiniRes = p.textContent.trim();
    if (textoMiniRes.length > maxChars) {
      p.textContent = textoMiniRes.slice(0, maxChars) + "...";
    }
  });
}

//CAMBIAR OPCIONES HEADER "VISTA (SI/NO)"
const opcionesVista = document.querySelectorAll(".inputVista");

opcionesVista.forEach((o) => {
  o.addEventListener("change", () => {
    if (o.checked) {
      inputVista = o.value;
      console.log("Valor Inputvista:", inputVista);
    }
  });
});

//-----------------------------------------------------------------------


//Añadir Película Botón
function btnAñadirPelicula() {
  if (modoAddEdit === "") {
    modoAddEdit= "add"
    contNuevaPeli.style.display = "flex";
    oscurecedor.style.display = "block";

    inputTitulo.value = "";
    inputSinopsis.value = "";
    inputYear.value = "";
    inputGenre.value = "";
    inputRating.value = "";
    inputUrl.value = "";
    inputImg.value = "";
    inputVista = "";
    document
      .querySelectorAll(".inputVista")
      .forEach((r) => (r.checked = false));
    previewImg.src = "img/defaultImgJuse_Mesa de trabajo 1.png";
  }
}

//1. AÑADIR PELICULA INTER-------------------------------------------------------
// BTN Cancelar Interfaz Añadir/EDITAR
function cancelarAñadirPeli() {
  contNuevaPeli.style.display = "none";
  oscurecedor.style.display = "none";
  peliculaChequeadaTemp = "";
  modoAddEdit= ""
}

//BTN Guardar
function btnGuardar() {
switch(modoAddEdit){
  case "add":
  guardarPeli()
  break

  case "edit":
  console.log("Pelicula editada");
  break
  
}
}

//Guardar Película en el array
function guardarPeli(){
  if (
    !inputTitulo.value.trim() ||
    !inputSinopsis.value.trim() ||
    !inputRating.value.trim()
  ) {
    console.log("No hay datos");
    return;
  }

  let valorVista;

  if (inputVista === "si") {
    valorVista = "Sí";
  } else {
    valorVista = "No";
  }

  const readerImg = new FileReader();
  const archivoImg = inputImg.files[0];

  if (archivoImg) {
    readerImg.readAsDataURL(archivoImg);

    readerImg.onload = function () {
      const imgSubida = readerImg.result;

      const pelicula = {
        titulo: `${inputTitulo.value}`,
        sinopsis: `${inputSinopsis.value}`,
        year: `${inputYear.value}`,
        calificacion: "10/10",
        urlImg: "",
        genero: `${inputGenre.value}`,
        img: imgSubida,
        vista: valorVista || "No",
      };

      peliculasAñadidas.push(pelicula);

      añadirPeliALista(pelicula);
      localStorage.setItem("peliculas", JSON.stringify(peliculasAñadidas));
      contNuevaPeli.style.display = "none";
      oscurecedor.style.display = "none";

      console.log("Pelicula Añadida!");
      console.log(`${JSON.stringify(pelicula)}`);
      console.log("pelis Añadidas:", `${JSON.stringify(peliculasAñadidas)}`);
    };

    readerImg.onerror = function () {
      console.log("Error al leer la img");
    };
  } else {
    const pelicula = {
      titulo: `${inputTitulo.value}`,
      sinopsis: `${inputSinopsis.value}`,
      year: `${inputYear.value}`,
      calificacion: "10/10",
      urlImg: "",
      genero: `${inputGenre.value}`,
      img: "",
      vista: valorVista || "No",
    };

    peliculasAñadidas.push(pelicula);

    añadirPeliALista(pelicula);
    localStorage.setItem("peliculas", JSON.stringify(peliculasAñadidas));
    contNuevaPeli.style.display = "none";
    oscurecedor.style.display = "none";

    console.log("Pelicula Añadida!");
    console.log(`${JSON.stringify(pelicula)}`);
    console.log("pelis Añadidas:", `${JSON.stringify(peliculasAñadidas)}`);
  }
}

//Añadir película a la lista HTML
function añadirPeliALista(pelicula) {
  const titulo = pelicula.titulo;
  const sinopsis = pelicula.sinopsis;
  const genero = pelicula.genero;
  const rating = pelicula.calificacion;
  const imagen = pelicula.img;
  const vista = pelicula.vista;

  //Creando una nueva FILA
  const nuevaFilaPeli = document.createElement("div");
  nuevaFilaPeli.classList.add("filaPeli", "peliculaCard");

  //1 Nuevo TÍTULO
  const nuevoTitle = document.createElement("h3");
  nuevoTitle.classList.add("nombrePeli", "filaStyle");
  nuevoTitle.innerHTML = titulo;

  //2 Nueva SINOPSIS
  const nuevaMiniRes = document.createElement("p");
  nuevaMiniRes.innerHTML = sinopsis;
  nuevaMiniRes.classList.add("sinopsis", "filaStyle");

  //3 Nueva IMAGEN
  const nuevaImgCont = document.createElement("div");
  nuevaImgCont.classList.add("imgPeliCont", "filaStyle");

  const nuevaImgPeli = document.createElement("img");
  nuevaImgPeli.classList.add("imgPeliElm");
  nuevaImgPeli.src = imagen || "img/defaultImgJuse_Mesa de trabajo 1.png";
  nuevaImgCont.appendChild(nuevaImgPeli);

  //4 Nuevo GENERO
  const nuevoGenero = document.createElement("div");
  nuevoGenero.innerHTML = genero;
  nuevoGenero.classList.add("genero", "filaStyle");

  //5 Nueva CALIFICACION
  const nuevoRating = document.createElement("div");
  nuevoRating.innerHTML = rating;
  nuevoRating.classList.add("rating", "filaStyle");

  //6 Nueva VISTA
  const nuevaVista = document.createElement("div");
  nuevaVista.innerHTML = vista;
  nuevaVista.classList.add("vista", "filaStyle");

  nuevaFilaPeli.appendChild(nuevoTitle);
  nuevaFilaPeli.appendChild(nuevaMiniRes);
  nuevaFilaPeli.appendChild(nuevaImgCont);
  nuevaFilaPeli.appendChild(nuevoGenero);
  nuevaFilaPeli.appendChild(nuevoRating);
  nuevaFilaPeli.appendChild(nuevaVista);
  ListaPelis.appendChild(nuevaFilaPeli);

  nuevaFilaPeli.addEventListener("click", () => {
    const tarjetaSel = nuevaFilaPeli.querySelector(".nombrePeli");
    const nombrePelicula = tarjetaSel.textContent;
    console.log(`${nombrePelicula}`);

    //Buscar la película en el Array
    const peliculaEncontrada = peliculasAñadidas.find(
      (peli) => peli.titulo === nombrePelicula
    );
    mostrarVistaDetail(peliculaEncontrada);
  });

  ajustarP();
}

function guardarPeliEditada(pelicula){

}

//2. VISTA DETALLE PELICULA INTER-------------------------------------------------
function mostrarVistaDetail(pelicula) {
  oscurecedor.style.display = "block";
  VistaDetail.style.display = "flex";
  sinopsisTxtDetail.innerText = pelicula.sinopsis;
  genreDetailText.innerText = pelicula.genero;
  tituloDetailPeli.innerText = pelicula.titulo;
  yearDetailTxt.innerText = pelicula.year;
  detailImg.src = pelicula.img;
  vistaDetailtxt.innerText = pelicula.vista;
}
//Cancelar vista de Detalle
function cancelarVistaDetail() {
  VistaDetail.style.display = "none";
  oscurecedor.style.display = "none";
  peliculaChequeadaTemp = "";
}

//LISTENERS------------------

btnAñadirPeli.addEventListener("click", () => {
  btnAñadirPelicula();
});

btnCancelarAdd.addEventListener("click", () => {
  cancelarAñadirPeli();
});

btnAñadirEdit.addEventListener("click", () => {
  btnGuardar();
});

btnCancelDetail.addEventListener("click", () => {
  cancelarVistaDetail();
});

inputImg.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      previewImg.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyE") {
    console.log("Data Storage Limpia!");
    localStorage.clear();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    oscurecedor.style.display = "none";
    VistaDetail.style.display = "none";
    contNuevaPeli.style.display = "none";
    peliculaChequeadaTemp = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyD") {
    console.log("peli chequeada:", peliculaChequeadaTemp);
    // console.log("pelis añadidas", peliculasAñadidas);
    console.log("Modo:", modoAddEdit);
    
  }
});
