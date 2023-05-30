const tabla = document.querySelector("#tabla-corte");

const empleado = localStorage.getItem("user");
const empleadoJSON = JSON.parse(empleado);

if (!localStorage.getItem('login') && empleadoJSON.Rol != "Administrador") {
    logOut();
    logOutCliente();
    redirectToNewPage();
} else {
    if (empleadoJSON.Rol === "Administrador" && localStorage.getItem("login")) {

        const fila1 = tabla.insertRow();
        var totalVentasCelda = fila1.insertCell();
        var totalReservaciones = fila1.insertCell();
        var totalRegistros = fila1.insertCell();

        axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/corte')
        .then(function (response) {
            registros = response.data;
            totalRegistros.innerHTML = registros;
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/corte/reservaciones')
        .then(function (response) {
            reservaciones = response.data;
            totalReservaciones.innerHTML = reservaciones;
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/v1/ventas/corte')
        .then(function (response) {
            ventas = response.data;
            totalVentasCelda.innerHTML = ventas;
        })
        .catch(function (error) {
            console.log(error);
        });

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