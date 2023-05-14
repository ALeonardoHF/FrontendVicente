// lista de todo el inventario disponible

const tabla = document.querySelector("#tabla-venta");
let precio, cantidad;

if (localStorage.getItem("cliente") || localStorage.getItem("user") == null) {
    redirectClient();
} else {
    if (localStorage.getItem("user") && localStorage.getItem("login")) {
        axios.get('http://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/ventas/')
            .then(function (response) {
                response.data.forEach(function (dato) {
                    const fila = document.createElement("tr");
                    let total = dato.Total.toFixed(2);

                    fila.innerHTML = `
            <td>${dato.Articulo}</td>
            <td>${dato.Cantidad}</td>
            <td>$ ${dato.Precio}</td>
            <td>$ ${total}</td>
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
    window.location.href = "/Frontend/Log In Empleado.html";

}

function redirectToMenu() {
    const empleado = localStorage.getItem("user");
    const empleadoJSON = JSON.parse(empleado);
    // Comprobar si se ha producido la condición
    if (localStorage.getItem("user") && empleadoJSON.Rol === "Administrador") {
        // Cambiar la ubicación de la página actual a la nueva página
        window.location.href = "/Frontend/Interfaz_administrador.html";
    } else if (localStorage.getItem("user")) {
        // Cambiar la ubicación de la página actual a la nueva página
        window.location.href = "/Frontend/Interfaz Empleado.html";
    } else {
        // Repetir la misma acción
        redirectToNewPage();
    }
}

function redirectClient() {
    if (localStorage.getItem("cliente")) {
        // Cambiar la ubicación de la página actual a la nueva página
        logOutCliente();
        window.location.href = "/Frontend/Log_In_Cliente.html";
    }
}

function logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    window.location.href = "/Frontend/Log In Empleado.html";
}

function logOutCliente() {
    localStorage.removeItem("cliente");
    localStorage.removeItem("loginCliente");
    // window.location.reload();
}

function abrirModal() {
    var modal = document.getElementById("modalPuntoVenta");
    document.addEventListener("keydown", cerrarModal);
    modal.showModal(); // Muestra el modal
    cargarTabla();
}

// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById("modalPuntoVenta");
    const tabla = document.querySelector("#tabla-inventario");
    tabla.innerHTML = "";
    document.removeEventListener("keydown", cerrarModal);
    modal.close(); // Cierra el modal
}

// Función para actualizar el dato
function obtenerValores() {
    document.getElementById("articulo").value = document.getElementById("articuloModal").value;
    document.getElementById("precio").value = document.getElementById("precioModal").value;
    cerrarModal(); // Cierra el modal después de actualizar el dato
}

function cargarTabla() {
    const tabla = document.querySelector("#tabla-inventario");
    axios.get('http://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/inventarios/')
            .then(function (response) {
                response.data.forEach(function (dato) {
                    const fila = document.createElement("tr");

                    if (dato.Precio == null) {
                        return;
                    }

                    fila.innerHTML = `
            <td>${dato.Nombre}</td>
            <input type="text" id="articuloModal" value="${dato.Nombre}" hidden/>
            <td id="cantidadModal" value="${dato.Cantidad}">${dato.Cantidad}</td>
            <input type="text" id="precioModal" value="${dato.Precio}" hidden/>
            <td id="precioModal" value="${dato.Precio}">${dato.Precio}</td>
            <td><button onclick="obtenerValores()">Seleccionar</button></td>
            `;
                    tabla.appendChild(fila);

                });
            });
}