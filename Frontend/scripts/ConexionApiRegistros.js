const form = document.getElementById('registroForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const numHabitacion = document.getElementById('numHabitacion').value;
    const habitacion = document.getElementById('habitacion').value;
    const checkin = document.getElementById('checkin');
    const huespedes = document.getElementById('huespedes').value;
    const modeloAuto = document.getElementById('modeloAuto').value;
    const matricula = document.getElementById('matricula').value;
    var auxCheckIn = new Date(checkin);
    let checkOut = auxCheckIn.setHours(auxCheckIn.getHours() + parseInt(habitacion));
    let precio;

    // obtener de localstorage el id del cliente
    const empleado = localStorage.getItem("user");
    const empleadoJSON = JSON.parse(empleado);

    switch (habitacion) {
        case "2":
            precio = 300;
            break;
        case "4":
            precio = 400;
            break;
        case "12":
            precio = 500;
            break;
        case "24":
            precio = 700;
            break;
    }

    if(huespedes > 2) {
        let hExtras = huespedes - 2;
        precio = precio + (hExtras * 100);
    }

    // Realizar la petición a través de Axios
      axios.post('https://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/registros/local', {
        numHabitacion: numHabitacion,
        modeloAuto: modeloAuto,
        habitacion: habitacion,
        precio: precio,
        checkin: checkin,
        checkout: checkOut,
        huespedes: huespedes,
        matricula: matricula
      })
        .then(function (response) {
          console.log(response);
          // form.reset();
          // window.location.href = "Reservaciones_Empleado.html";

        })
        .catch(function (error) {
          console.log(error);
        });
});


function redirectClientReservations() {
  window.location.href = "Reservaciones_Cliente.html";
}

function logOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("login");
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