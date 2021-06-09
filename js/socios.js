/*WEB STORAGE- LOCAL STORAGE*/

var nombre_local;
var id_tarea;
var array_tareas = [];
var campos = document.getElementsByName("formcito_campo");

function getNombre() {
	nombre_local = localStorage.getItem("nombre");
}

function getTareaMax() {
	let maximo=0;
	for (var i=0; i<localStorage.length;i++) {
		let id = localStorage.key(i);
		let valor = localStorage.getItem(id);

		if (id!="nombre") {
			if (Number(id)>maximo) {
				maximo = Number(id)
			} 
		}
	}

	id_tarea = maximo + 1
}

function eliminar_tabla() {
	var tabla = document.getElementById("tareas");
	var filas = document.getElementsByTagName("tr");

	for(var i = 1; i<filas.length; i++) {
		tabla.deleteRow(i)
		i--
		
	}
}

function actualizar_tabla_reload() {


	for(var i= 0; i<localStorage.length; i++) {
		let id = localStorage.key(i);
		let valor = localStorage.getItem(id);

		if (id!="nombre") {
			
			let tareas = valor.split(",");
			
			let array_temp = [id, tareas[0], tareas[1], tareas[2]];
			
			actualizar_tabla(array_temp);
		}
		
	}

}



function iniciar() {
	let nombre;
	let tituloFront = document.getElementById("titulo_tareas");
	let titulo;

	getNombre();

	if (nombre_local == null || nombre_local == "") {
		
/*pide el nombre*/
		alert  ("Por favor indique su nombre")
		nombre = prompt("Mi nombre es...");

		if (nombre == null || nombre == "") {		
			nombre = "Sr/Sra.Socio"
		}
	
		localStorage.setItem("nombre", nombre);

	}

	getNombre();		

	alert ("Hola " + nombre_local + ". Este es el panel de tareas para Bon Odori. Tené en cuenta que se va a guardar la información en tu dispositivo")

	titulo = "Tareas de " + nombre_local + " para Bon Odori"

	tituloFront.innerHTML = titulo;

	getTareaMax();

	campos[0].value = Number(id_tarea);

	actualizar_tabla_reload();
	actualizar_select();

}


function agregar() {
	
	var array_campos = []	

	for(var i=0; i<campos.length; i++) {
		
		if (campos[i].value == null || campos[i].value == "") {
			alert("Ningún campo puede estar vacío")	
			return;
		} else {
			array_campos.push(campos[i].value);
		}
	}	

	
	actualizar_tabla(array_campos);

/*setea en el storage*/

	array_ultima_tarea = [array_campos[1], array_campos[2], array_campos[3]]

	localStorage.setItem(array_campos[0], array_ultima_tarea);

	getTareaMax();
	campos[0].value = id_tarea;
	
	actualizar_select();
}

function actualizar_select() {
	var selector = document.getElementById("option_eliminar");

	//primero remueve y después vuelve a cargar
    var opciones = selector.getElementsByTagName('OPTION');
    for(var i=0; i<opciones.length; i++) {
            selector.removeChild(opciones[i]);
            i--          
        }
    
    let array_para_ordenar = []

	for(var i= 0; i<localStorage.length; i++) {
		let id = localStorage.key(i);
		let valor = localStorage.getItem(id);
		

		if (id!="nombre") {
			array_para_ordenar.push(id)	
		}	
	}

	array_para_ordenar.sort(function(a, b){return a-b});

	for (var  i =0; i<array_para_ordenar.length;i++) {
			let opcion = document.createElement("option")
			opcion.text = array_para_ordenar[i];
			opcion.value = array_para_ordenar[i];		
			selector.appendChild(opcion)
	}
}

function actualizar_tabla(array_campos) {

	var tabla = document.getElementById("tareas")
/*agrega a la tabla*/
	let fila = document.createElement("tr");

	switch (array_campos[2]) {

		case "Muy urgente":
			fila.style.backgroundColor = "Red"
			fila.style.color = "White"
			break;


		case "Urgente":
			fila.style.backgroundColor = "Yellow"
			break;


		case "Poco urgente":
			fila.style.backgroundColor = "Green"
			fila.style.color = "White"

			break;

	}

	for(var i=0; i<array_campos.length; i++) {
		
		let celda = document.createElement("td");
		celda.innerHTML = array_campos[i];
		fila.appendChild(celda);		
		
	}

	tabla.appendChild(fila);

}

function eliminar_storage() {
	let confirmacion = confirm("Desea reiniciar? Se eliminaran todos sus datos")

	if (confirmacion == true) {
		localStorage.clear();
		location.reload();
	} else {
		return
	}
	
}


function eliminar_registro() {
	var id_a_eliminar = document.getElementById("option_eliminar").value

	var confirmacion = confirm("Desea eliminar el registro " + id_a_eliminar + "?")

	if(confirmacion==true) {
		localStorage.removeItem(id_a_eliminar);
	} else {
		return
	}

	eliminar_tabla()
	actualizar_tabla_reload();
	actualizar_select();


}

window.onload = iniciar();

