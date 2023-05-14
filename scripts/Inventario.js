// lista de todo el inventario disponible

// Modificar la interfaz de inventario, para que los 2 inputs number sean min='0'
// y no puedas agregar negativos a cantidad y a precio

const tabla = document.querySelector("#tabla-inventario");
const empleado = localStorage.getItem("user");
const empleadoJSON = JSON.parse(empleado);
var productoId;

if (localStorage.getItem("cliente") || localStorage.getItem("user") == null) {
    redirectClient();
} else {
    if (localStorage.getItem("user") && localStorage.getItem("login") && empleadoJSON.Rol === "Administrador") {
        axios.get('http://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/inventarios/')
            .then(function (response) {
                response.data.forEach(function (dato) {
                    const fila = document.createElement("tr");

                    if (dato.Precio == null) {
                        dato.Precio = 'Inventario Interno';
                    }

                    fila.innerHTML = `
            <td>${dato.Nombre}</td>
            <td>${dato.Cantidad}</td>
            <td>${dato.Precio}</td>
            <td><button value="${dato.productoId}" onclick="actualizar(event)">Actualizar</button></td>
            `;
                    tabla.appendChild(fila);

                });
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        redirectToNewPage();
    }
}


function redirectToNewPage() {
    logOut();
    window.location.href = "Log In Empleado.html";
}

function redirectToMenu() {
    const empleado = localStorage.getItem("user");
    const empleadoJSON = JSON.parse(empleado);
    // Comprobar si se ha producido la condición
    if (localStorage.getItem("user") && empleadoJSON.Rol === "Administrador") {
        // Cambiar la ubicación de la página actual a la nueva página
        window.location.href = "Interfaz_administrador.html";
    } else if (localStorage.getItem("user")) {
        // Cambiar la ubicación de la página actual a la nueva página
        window.location.href = "Interfaz Empleado.html";
    } else {
        // Repetir la misma acción
        redirectToNewPage();
    }
}

function redirectClient() {
    if (localStorage.getItem("cliente")) {
        // Cambiar la ubicación de la página actual a la nueva página
        logOutCliente();
        window.location.href = "Log_In_Cliente.html";
    }
}

function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    // window.location.reload();
}

function logOutCliente() {
    localStorage.removeItem("cliente");
    localStorage.removeItem("loginCliente");
    // window.location.reload();
}

// Función para abrir el modal
function actualizar(event) {
    productoId = event.target.value;
    var modal = document.getElementById("modalActualizarDatos");
    modal.showModal(); // Muestra el modal
}

// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById("modalActualizarDatos");
    modal.close(); // Cierra el modal
}

// Función para actualizar el dato
function actualizarDato() {
  var cantidad = document.getElementById("cantidadModal").value;
    // Aquí puedes hacer lo necesario para actualizar el dato, por ejemplo, enviar una solicitud HTTP al servidor
    axios.post(`http://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/inventarios/actualizar/${productoId}`, {
        cantidad: cantidad,
    })
        .then(function (response) {
             console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    window.location.reload();
    cerrarModal(); // Cierra el modal después de actualizar el dato
}
