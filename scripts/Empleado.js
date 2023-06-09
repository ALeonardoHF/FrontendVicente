// lista de todo el inventario disponible

// Modificar la interfaz de inventario, para que los 2 inputs number sean min='0'
// y no puedas agregar negativos a cantidad y a precio

const tabla = document.querySelector("#tabla-empleados");
const empleado = localStorage.getItem("user");
const empleadoJSON = JSON.parse(empleado);

if (localStorage.getItem("cliente") || localStorage.getItem("user") == null) {
    redirectClient();
} else {
    if (localStorage.getItem("user") && localStorage.getItem("login")) {
        if (localStorage.getItem("user") && localStorage.getItem("login") && empleadoJSON.Rol === "Administrador") {
            axios.get('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/empleados/')
                .then(function (response) {
                    response.data.forEach(function (dato) {
                        console.log()
                        const fila = document.createElement("tr");
                        let password;

                        if (dato.Rol == "Administrador") {
                            password = "N/A";
                        } else {
                            password = dato.Password;
                        }

                        fila.innerHTML = `
                <td>${dato.NumeroEmpleado}</td>
                <td>${dato.Nombre}</td>
                <td>${dato.Apellido}</td>
                <td>${password}</td>
                <td>${dato.Rol}</td>
                `;
                        tabla.appendChild(fila);

                    });
                })
                .catch(function (error) {
                    console.log(error);
                });


        } else {
            logOut();
            logOutCliente();
            redirectToNewPage();
        }
    } else {
        logOut();
        logOutCliente();
        redirectToNewPage();
    }
}

function recargaEmpleados() {
    window.location.reload();
}

function redirectToNewPage() {
    window.location.href = "Log In Empleado.html";
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