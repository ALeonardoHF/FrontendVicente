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
        axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/registros/corte')
            .then(function (response) {
                registros = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/corte/reservaciones')
            .then(function (response) {
                reservaciones = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

            if(reservaciones == null) {
                reservaciones = 0;
            }

            if(registros == null) {
                registros = 0;
            }


        const fila = document.createElement("tr");
        let totalResReg = reservaciones + registros;
        fila.innerHTML = `
        <td>Pendiente Ventas</td>
        <td>${totalResReg}</td>
        `;

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