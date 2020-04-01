
var personas = [];
var input_search = document.getElementById('busquedaNombre');

var personas_filtradas = [];
var filtroaplicado = false;
/**
 * alterna la lista actualizada contra la lista
 * original.
 */
function handleOnAlternarLista() {
    setTimeout(function(){ alert("La lista ha sido actualizada");
    if (filtroaplicado){
        recargarLista(personas);
        filtroaplicado = false;
    }
    else{
        recargarLista(personas_filtradas);
        filtroaplicado = true;
    }}, 5000);
}

/**
 * muestra la cantidad de personas que estan en la lista
 */
function handleOnCantidadPersonas() {

    if (filtroaplicado){
        return alert(`Cantidad personas ${personas_filtradas.length}`)
    }
    else{
        return alert(`Cantidad personas ${personas.length}`)
    }
}

/**
 * elimina la primera persona de la lista
 */
function handleOnEliminarPrimero() {
    console.log(filtroaplicado);
    if (filtroaplicado){
        personas_filtradas.shift();
        recargarLista(personas_filtradas);
    }
    else{
        personas.shift();
        recargarLista(personas);
    }
}

/**
 * elimina la ultima persona de la lista.
 */
function handleOnEliminarUltimo() {
    
    if (filtroaplicado){
        personas_filtradas.pop();
        recargarLista(personas_filtradas);
    }
    else{
        personas.pop();
        recargarLista(personas);
    }
}

/**
 * del total de personas cargadas, filtra las que no coinciden con el criterio de busqueda.
 * @param {string} nombre 
 */
function handleOnBuscarPorNombre() {

    filtroaplicado = true;
    let elem_search =  input_search.value;
    personas_filtradas = personas.filter(function(elem){
        return elem.nombre.toLowerCase().includes(elem_search.toLowerCase().trim())
    });

    if(personas_filtradas.length > 0){
        recargarLista(personas_filtradas);
    }
    else{
        alert("El nombre ingresado no se encuentra en la lista");
    }
}

/**
 * limpia la busqueda de persona.
 */
function handleOnLimpiarBusquedaPersona() {

    input_search.value = "";
    filtroaplicado = false;
    return onCargarPersonas()
}

/**
 * indica que persona hay que eliminar 
 * pasando por parametro el id.
 * @param {number} idPersona 
 */
function handleOnEliminarPersona(id) {

    let validar = confirm ('Estas seguro que deseas borrar el id - ' + id);
    if (validar && !filtroaplicado) {
        let index = personas.findIndex(elem => elem.id == id);
        personas.splice(index,1);
        recargarLista(personas)
    }
    else {
        let index = personas_filtradas.findIndex(elem => elem.id == id);
        personas_filtradas.splice(index,1);
        recargarLista(personas_filtradas)
    }
    
}
//myFish.splice(x, 1);
/**
 * evento para actualizar el nombre de una persona
 * pasando por parametro el id.
 * @param {number} idPersona 
 */
function handleOnActualizarNombrePersona(id) {

    let persona = personas.find(elem => elem.id == id);
    if(!persona) return;

    let nombre =  prompt('Escriba el nombre');
    if(!nombre || !nombre.trim()) return;

    if (!filtroaplicado) {
        persona.nombre = nombre;
        recargarLista(personas)
    }
    else {
        let persona_filtrada = personas_filtradas.find(elem => elem.id == id);
        persona_filtrada.nombre = nombre;
        recargarLista(personas_filtradas)
    }
}

/**
 * Recibe un array de personas y lo 
 * agrega a la lista de la pantalla.
 * @param {Array} personas 
 */
function recargarLista(personas) {
    
    // creacion de tabla y registro
    var table = document.getElementById("tablePersonas");
    var tbody = table.getElementsByTagName("tbody")[0];

    var tbodyNew = document.createElement('tbody');

    for(var i = 0; i < personas.length; i++) {

        var tr = tbodyNew.insertRow(i);

        // celda
        var tdId = tr.insertCell(0);
        tdId.className = "text-center";
        tdId.innerText = personas[i].id;

        // celda
        var tdNombre = tr.insertCell(1);
        tdNombre.className = "text-center";
        tdNombre.innerText = personas[i].nombre;

        // celda
        var tdApellido = tr.insertCell(2);
        tdApellido.innerText = personas[i].apellido;
        tdApellido.className = "text-center";

        // celda
        var tdEdad = tr.insertCell(3);
        tdEdad.innerText = personas[i].edad;
        tdEdad.className = "text-center";

        // boton de accion
        var button = document.createElement("button");
        button.className = "btn btn-primary btn-sm mr-1";
        button.type = "button";
        button.setAttribute( "onClick", `handleOnEliminarPersona('${personas[i].id}')`);
        button.innerText = "Eliminar";

        var button2 = document.createElement("button");
        button2.className = "btn btn-primary btn-sm mr-1";
        button2.type = "button";
        button2.setAttribute( "onClick", `handleOnActualizarNombrePersona('${personas[i].id}')`);
        button2.innerText = "Actualizar Nombre";

        // celda
        var tdAccion = tr.insertCell(4);
        tdAccion.className = "text-center";
        tdAccion.appendChild(button);
        tdAccion.appendChild(button2);
    }

    table.replaceChild(tbodyNew, tbody);
}

/**
 * function que carga personas
 */
function onCargarPersonas() {
    
    var persona1 = {
        id: 4,
        nombre: "Gabriel",
        apellido: "Martinez",
        edad: 20
    };
    
    var persona2 = {
        id: 55,
        nombre: "Martin",
        apellido: "Tolosa",
        edad: 25
    };
    
    var persona3 = {
        id: 57,
        nombre: "Marcelo",
        apellido: "Alvarez",
        edad: 37
    };
    
    var persona4 = {
        id: 8,
        nombre: "Florencia",
        apellido: "Guzman",
        edad: 30
    };
    
    var persona5 = {
        id: 9,
        nombre: "Julieta",
        apellido: "Garcia",
        edad: 33
    };
    
    var persona6 = {
        id: 12,
        nombre: "Mariela",
        apellido: "Santini",
        edad: 40
    };

    personas = [persona1, persona2, persona3, persona4, persona5, persona6];

    recargarLista(personas);
    
}

onCargarPersonas();




