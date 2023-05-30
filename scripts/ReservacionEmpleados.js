// lista de todas las reservaciones


const tabla = document.querySelector("#tabla-reservaciones");
const tablaRegistros = document.querySelector("#tabla-registros");

const cliente = localStorage.getItem("user");
const clienteJSON = JSON.parse(cliente);

const user = localStorage.getItem("user");
const login = localStorage.getItem("login");

var idReservacionLocal, idReservacionLinea;

if (localStorage.getItem("cliente") || localStorage.getItem("user") == null) {
    redirectClient();
} else {
    if (user && login) {
            // Producción > https://app-2d64e7c9-c8c0-4a1d-a9a3-13fa174719d3.cleverapps.io/api/reservaciones
            // Desarrollo > http://localhost:3002/api/reservaciones
        axios.get(`https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/reservaciones`)
            .then(function (response) {
                response.data.forEach(function (dato) {

                    const fechaIn = new Date(dato.CheckIn);
                    const fechaOut = new Date(dato.CheckOut);

                    const diaIn = fechaIn.getUTCDay().toString().padStart(2, '0');
                    const mesIn = (fechaIn.getUTCMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
                    const anioIn = fechaIn.getUTCFullYear();
                    let horasIn = fechaIn.getUTCHours() - 1;

                    if(horasIn < 0) {
                        horasIn = 23;
                    }

                    horasIn.toString().padStart(2, '0');

                    const minutosIn = fechaIn.getUTCMinutes().toString().padStart(2, '0');
                    const segundosIn = fechaIn.getUTCSeconds().toString().padStart(2, '0');

                    const fechaFormateadaIn = `${diaIn}-${mesIn}-${anioIn} ${horasIn}:${minutosIn}:${segundosIn}`;

                    const diaOut = fechaOut.getDay().toString().padStart(2, '0');
                    const mesOut = (fechaOut.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
                    const anioOut = fechaOut.getFullYear();
                    const horasOut = fechaOut.getHours().toString().padStart(2, '0');
                    const minutosOut = fechaOut.getMinutes().toString().padStart(2, '0');
                    const segundosOut = fechaOut.getSeconds().toString().padStart(2, '0');

                    const fechaFormateadaOut = `${diaOut}-${mesOut}-${anioOut} ${horasOut}:${minutosOut}:${segundosOut}`;

                    const fechaHoy = new Date();
                    let caducidad;

                    if (fechaHoy > fechaOut) {
                        caducidad = 'Vencida'
                    } else {
                        caducidad = 'Válida'
                    }

                    const fila = document.createElement("tr");

                    fila.innerHTML = `
                <td>${fechaFormateadaIn}</td>
                <td>${fechaFormateadaOut}</td>
                <td>${dato.TiempoEstancia} hrs</td>
                <td>${dato.CodigoAuth}</td>
                <td>${dato.Telefono}</td>
                <td>${dato.Huespedes}</td>
                <td>${dato.ModeloAuto}</td>
                <td>${dato.Matricula}</td>
                <td>${dato.NumHabitacion}</td>
                <td>$ ${dato.Precio}</td>
                <td>${caducidad}</td>
                <td><button value="${dato.idReservacion}" onclick="actualizarLinea(event)">Actualizar</button></td>
                `;

                    tabla.appendChild(fila);

                });
            })
            .catch(function (error) {
                console.log(error);
            });

        // segundo accios tabla local
        // Producción > https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/local
        // Desarrollo > http://localhost:3002/api/registros/local
        axios.get(`https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/local`)
            .then(function (response) {
                response.data.forEach(function (dato) {
                    const fechaIn = new Date(dato.CheckIn);
                    const fechaOut = new Date(dato.CheckOut);

                    const diaIn = fechaIn.getUTCDay().toString().padStart(2, '0');
                    const mesIn = (fechaIn.getUTCMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
                    const anioIn = fechaIn.getUTCFullYear();
                    let horasIn = fechaIn.getUTCHours() - 1;

                    if(horasIn < 0) {
                        horasIn = 23;
                    }

                    horasIn.toString().padStart(2, '0');
                    const minutosIn = fechaIn.getUTCMinutes().toString().padStart(2, '0');
                    const segundosIn = fechaIn.getUTCSeconds().toString().padStart(2, '0');

                    const fechaFormateadaIn = `${diaIn}-${mesIn}-${anioIn} ${horasIn}:${minutosIn}:${segundosIn}`;

                    const diaOut = fechaOut.getDay().toString().padStart(2, '0');
                    const mesOut = (fechaOut.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
                    const anioOut = fechaOut.getFullYear();
                    const horasOut = fechaOut.getHours().toString().padStart(2, '0');
                    const minutosOut = fechaOut.getMinutes().toString().padStart(2, '0');
                    const segundosOut = fechaOut.getSeconds().toString().padStart(2, '0');

                    const fechaFormateadaOut = `${diaOut}-${mesOut}-${anioOut} ${horasOut}:${minutosOut}:${segundosOut}`;

                    const fechaHoy = new Date();
                    let caducidad;

                    if (fechaHoy > fechaOut) {
                        caducidad = 'Vencida'
                    } else {
                        caducidad = 'Válida'
                    }

                    const fila = document.createElement("tr");

                    fila.innerHTML = `
                <td>${fechaFormateadaIn}</td>
                <td>${fechaFormateadaOut}</td>
                <td>${dato.TiempoEstancia} hrs</td>
                <td>${dato.CodigoAuth}</td>
                <td>${dato.Telefono}</td>
                <td>${dato.Huespedes}</td>
                <td>${dato.ModeloAuto}</td>
                <td>${dato.Matricula}</td>
                <td>${dato.NumHabitacion}</td>
                <td>$ ${dato.Precio}</td>
                <td>${caducidad}</td>
                <td><button value="${dato.idReservacion}" onclick="actualizarLocal(event)">Actualizar</button></td>
                `;

                    tablaRegistros.appendChild(fila);

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
    window.location.href = "Log In Empleado.html";
}

function logOutCliente() {
    localStorage.removeItem("cliente");
    localStorage.removeItem("loginCliente");
    // window.location.reload();
}

function reload() {
    window.location.reload();
}

// Función para abrir el modal
function actualizarLocal(event) {
    idReservacionLocal = event.target.value;
    var modal = document.getElementById("modalActualizarDatosLocal");
    modal.showModal(); // Muestra el modal
}

function actualizarLinea(event) {
    idReservacionLinea = event.target.value;
    var modal = document.getElementById("modalActualizarDatosLinea");
    modal.showModal(); // Muestra el modal
}

// Función para cerrar el modal
function cerrarModalLinea() {
    var modal = document.getElementById("modalActualizarDatosLinea");
    modal.close(); // Cierra el modal
}

function cerrarModalLocal() {
    var modal = document.getElementById("modalActualizarDatosLocal");
    modal.close(); // Cierra el modal
}

// Función para actualizar el dato
function actualizarDatoLocal() {
    var modeloAuto = document.getElementById("modeloAutoL").value;
    var matricula = document.getElementById("matriculaL").value;
    var numHabitacion = document.getElementById("numHabitacionL").value;
    var idReservacion = idReservacionLocal;

    // Aquí puedes hacer lo necesario para actualizar el dato, por ejemplo, enviar una solicitud HTTP al servidor
    axios.post(`https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/actualizar/${idReservacion}`, {
        modeloAuto: modeloAuto,
        matricula: matricula,
        numHabitacion: numHabitacion
    })
        .then(function (response) {
            //  console.log(response);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
    
    cerrarModalLocal(); // Cierra el modal después de actualizar el dato
}

function actualizarDatoLinea() {
    var modeloAuto = document.getElementById("modeloAuto").value;
    var matricula = document.getElementById("matricula").value;
    var numHabitacion = document.getElementById("numHabitacion").value;
    var idReservacion = idReservacionLinea;

    // Aquí puedes hacer lo necesario para actualizar el dato, por ejemplo, enviar una solicitud HTTP al servidor
    axios.post(`https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/reservaciones/actualizar/${idReservacion}`, {
        modeloAuto: modeloAuto,
        matricula: matricula,
        numHabitacion: numHabitacion
    })
        .then(function (response) {
            //  console.log(response);
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
    
    cerrarModalLinea(); // Cierra el modal después de actualizar el dato
}