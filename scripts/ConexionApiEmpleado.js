const form = document.getElementById('empleadoForm');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const password = document.getElementById('password').value;
  const rol = document.getElementById('rol').value;

  // Realizar la petición a través de Axios
  axios.post('https://app-2d64e7c9-c8c0-4a1d-a9a3-13fa174719d3.cleverapps.io/api/empleados/', {
    nombre: nombre,
    apellido: apellido,
    password: password,
    rol: rol
  })
    .then(function (response) {
      form.reset();
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
    
});

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
