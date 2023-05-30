const tabla = document.querySelector("#tabla-corte");
let reservaciones, registros;
let ventas;

const empleado = localStorage.getItem("user");
const empleadoJSON = JSON.parse(empleado);

if (!localStorage.getItem('login') && empleadoJSON.Rol != "Administrador") {
    logOut();
    logOutCliente();
    redirectToNewPage();
} else {
    if (empleadoJSON.Rol === "Administrador" && localStorage.getItem("login")) {

        ObtenerDatosCortes()

    } else {
        redirectToNewPage();
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

function redirectToNewPage() {
    window.location.href = "index.html";

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

function ObtenerDatosCortes() {
    const registros = 'https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/corte';
    const reservaciones = 'https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/corte/reservaciones';
    const ventas = 'https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/v1/ventas/corte';

    Promise.all([
        obtenerDatos(registros),
        obtenerDatos(reservaciones),
        obtenerDatos(ventas)
    ])
    .then(datos => mostrarDatosTabla(datos))
    .catch(error => console.error(error));
}

function mostrarDatosTabla(datos) {
        datos.foreach(objeto => {
            const fila = tabla.insertRow();
            Object.values(objeto).foreach(valor => {
                const celda = fila.insertCell();
                celda.textContent = valor;
            });
        });
}

// const fila1 = tabla.insertRow();
//         var totalVentasCelda = fila1.insertCell();
//         var totalResRegCelda = fila1.insertCell();

//         totalVentasCelda.innerHTML = ventas;

//         let totalResReg = reservaciones + registros;
//         totalResRegCelda.innerHTML = totalResReg;


// axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/corte')
// .then(function (response) {
//     registros = response.data;
//     console.log('response registros:>> ', response.data);
// })
// .catch(function (error) {
//     console.log(error);
// });

// axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/corte/reservaciones')
// .then(function (response) {
//     reservaciones = response.data;
//     console.log('response reservaciones:>> ', response.data);
// })
// .catch(function (error) {
//     console.log(error);
// });

// axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/v1/ventas/corte')
// .then(function (response) {
//     reservaciones = response.data;
//     console.log('response ventas:>> ', response.data);
// })
// .catch(function (error) {
//     console.log(error);
// });