const form = document.getElementById('reservacionForm');

var verificacionDiv = document.getElementById('verificacionDiv');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const habitacion = document.getElementById('habitacion').value;
  const checkin = document.getElementById('checkin').value;
  const huespedes = document.getElementById('huespedes').value;
  var auxCheckIn = new Date(checkin);
  let checkOut = auxCheckIn.setHours(auxCheckIn.getHours() + parseInt(habitacion));
  console.log('checkOut :>> ', checkOut);
  console.log('auxCheckIn :>> ', auxCheckIn);
  console.log('checkin :>> ', checkin);
  console.log('habitacion :>> ', parseInt(habitacion));
  let precio;

  // obtener de localstorage el id del cliente
  const cliente = localStorage.getItem("cliente");
  const clienteJSON = JSON.parse(cliente);

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

  if (huespedes > 2) {
    let hExtras = huespedes - 2;
    precio = precio + (hExtras * 100);
  }

  console.log('precio :>> ', precio);

  // Realizar la petición a través de Axios
  // Producción > https://app-2d64e7c9-c8c0-4a1d-a9a3-13fa174719d3.cleverapps.io/api/reservaciones/
  // Desarrollo > http://localhost:3002/api/reservaciones/
  axios.post('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/reservaciones/', {
    nombre: nombre,
    telefono: telefono,
    habitacion: habitacion,
    precio: precio,
    checkin: checkin,
    checkout: checkOut,
    clienteId: clienteJSON.idCliente,
    huespedes: huespedes
  })
    .then(function (response) {
      if (verificar(response)) {
        verificacionDiv.style.display = "block";
        document.getElementById('codigoVerificacion').textContent = response.data.CodigoAuth;
      } else {
        verificacionDiv.style.display = "none";
      }
      form.reset();
    })
    .catch(function (error) {
      console.log(error);
    });

  // recarga la página, no es necesario en esta sección
  // location.reload();
});

function verificar(response) {
  // Comprobar alguna condición
  if (response.status == 200) {

    return true;
  } else {

    return false;
  }
}

function redirectClientReservations() {
  window.location.href = "Reservaciones_Cliente.html";
}

function logOutCliente() {
  localStorage.removeItem("cliente");
  localStorage.removeItem("loginCliente");
  window.location.href = "Log_In_Cliente.html";
}