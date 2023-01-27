//Variables
const genero = document.querySelector('#genero');
const year = document.querySelector('#year');
const duracion = document.querySelector('#duracion');
const galardonada = document.querySelector('#galardonada');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');


//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear(); //años en el que estamos
const min = max - 8;

console.log(max)
console.log(min)

//Generamos objeto con la busqueda que el usuario haga
const datosBusqueda = {
    genero: '',
	year: '',
    duracion: '',
    galardonada: '',
	preciomin: '',
    preciomax: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => { //una vez que se cargue todo el contenido enytra funcion
    mostrarPeliculas(peliculas); 

    //Llena las opciones de años
    llenarSelect()
})

//Event listener para los select de busqueda
genero.addEventListener('change', e => { //cuando cambie el select de genero leemos valor de e que selecciono
    datosBusqueda.genero = e.target.value;//asignamos a arreglo vacio en genero
    filtrarPelicula();
})

year.addEventListener('change', e => { 
    datosBusqueda.year = parseInt(e.target.value);//convertir a numero porque lo da en string
    filtrarPelicula();
})


minimo.addEventListener('change', e => { 
    datosBusqueda.preciomin = e.target.value;

    filtrarPelicula();
})


maximo.addEventListener('change', e => { 
    datosBusqueda.preciomax = e.target.value;
    filtrarPelicula();
})

duracion.addEventListener('change', e => { 
    datosBusqueda.duracion = parseInt(e.target.value);
    filtrarPelicula();
})

galardonada.addEventListener('change', e => { 
    datosBusqueda.galardonada = e.target.value;
    filtrarPelicula();
})


//Funciones 
function mostrarPeliculas(peliculas){

    limpiarHTML(); //elimina el HTML previo

    peliculas.forEach( pelicula => {

        const {genero, year, precio, duracion, galardonada, nombre} = pelicula; //extraemos con struturing los datos de objeto 
        const peliculaHTML = document.createElement('p');

        //escribimos contenido en ese parrafo creado
        peliculaHTML.textContent = `
        (${nombre}) - Galardonada: (${galardonada}) - Genero: (${genero}) - Año: (${year}) - 
        Precio : ($${precio}) - Duracion : mas de (${duracion}) Horas

        `;

        //insertamos en el html
        resultado.appendChild(peliculaHTML)
    })
}

//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


//Genera los años del select
function llenarSelect(){
    for (let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año añ select
    }

}

//Funcion que filtra en base a la busqueda //Filtamos primero por genero luego year
function filtrarPelicula(){ //filter busca en un arreglo de objetos y lo compara en base a genero 
    const resultado = peliculas.filter(filtrarGenero).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarGalardonada).filter(filtrarDuracion) //funcion aue llama otra funcion
    //console.log(resultado);

    mostrarPeliculas(resultado);

    if(resultado.length){//si hay objetos en el arreglo de busqueda mostramos autos
        mostrarPeliculas(resultado);
    }
    else{
            noResultado();//si no hay nada creamos un div en esta funcion
        }
    
}

function noResultado(){ //mensaje cuando no hay coicidencias en busqueda

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, Intenta con otros parametros de busqueda';
    resultado.appendChild(noResultado);
}

//iteremos sobre cada pelicula
function filtrarGenero(pelicula) { //recibe cada pelicula del arreglo peliculas
    if(datosBusqueda.genero){ //si en objeto datosBusqueda el genero existe
        return pelicula.genero === datosBusqueda.genero;
    }
    return pelicula; //si no selecciona nada devuelve el objeto completo
}

function filtrarYear(pelicula) {
    if(datosBusqueda.year){ //si en objeto datosBusqueda el genero existe
        return pelicula.year === datosBusqueda.year;
    }
    return pelicula; //si no selecciona nada devuelve el objeto completo
}

function filtrarMinimo(pelicula){
    if(datosBusqueda.preciomin){ //si en objeto datosBusqueda el genero existe
        return pelicula.precio >= datosBusqueda.preciomin;
    }
    return pelicula; //si no selecciona nada devuelve el objeto completo
}

function filtrarMaximo(pelicula){
    if(datosBusqueda.preciomax){ //si en objeto datosBusqueda el genero existe
        return pelicula.precio <= datosBusqueda.preciomax;
    }
    return pelicula; //si no selecciona nada devuelve el objeto completo
}

function filtrarGalardonada(pelicula){
    if(datosBusqueda.galardonada){ //si en objeto datosBusqueda el genero existe
        return pelicula.galardonada === datosBusqueda.galardonada;
    }
    return pelicula; //si no selecciona nada devuelve el objeto completo

}

function filtrarDuracion(pelicula){
    if(datosBusqueda.duracion){ //si en objeto datosBusqueda el genero existe
        return pelicula.duracion === datosBusqueda.duracion;
    }
    return pelicula; //si no selecciona nada devuelve el objeto completo

}