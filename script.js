// 1. Traemos los elementos del HTML
const formulario = document.getElementById("formulario");
const inputTarea = document.getElementById("inputTarea");
const listaTareas = document.getElementById("listaTareas");
 
// 2. Array de objetos: aqui guardamos todas las tareas
// Ejemplo de una tarea: { descripcion: "Estudiar", completada: false }
let tareas = [];
 
// 3. Funcion que borra todo y vuelve a dibujar las tareas segun el array
function renderTasks() {
    listaTareas.innerHTML = "";
 
    // Primero las pendientes y despues las completadas (las completadas van al final)
    const pendientes = tareas.filter(function (t) {
        return t.completada === false;
    });
    const completadas = tareas.filter(function (t) {
        return t.completada === true;
    });
    const ordenadas = pendientes.concat(completadas);
 
    // Por cada tarea creamos un <li>
    ordenadas.forEach(function (tarea) {
        const li = document.createElement("li");
        li.className = "tarea";
        if (tarea.completada) {
            li.classList.add("completada");
        }
 
        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.addEventListener("change", function () {
            // Cambia true por false o false por true
            tarea.completada = !tarea.completada;
            renderTasks();
        });
 
        // Texto de la tarea
        const texto = document.createElement("span");
        texto.textContent = tarea.descripcion;
 
        // Boton eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "🗑";
        botonEliminar.addEventListener("click", function () {
            // Dejamos en el array todas las tareas menos esta
            tareas = tareas.filter(function (t) {
                return t !== tarea;
            });
            renderTasks();
        });
 
        li.appendChild(checkbox);
        li.appendChild(texto);
        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    });
}
 
// 4. Cuando se envia el formulario (Enter) agregamos una tarea nueva
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que se recargue la pagina
 
    const texto = inputTarea.value.trim();
 
    // Si esta vacio no hacemos nada
    if (texto === "") {
        return;
    }
 
    // Agregamos la tarea al array
    tareas.push({ descripcion: texto, completada: false });
 
    inputTarea.value = ""; // limpiamos el input
    renderTasks();
});