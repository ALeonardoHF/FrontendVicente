const form = document.getElementById('agendaForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const profesion = document.getElementById('profesion').value;
  const inforel = document.getElementById('info').value;
  const numtel = document.getElementById('telefono').value;

  console.log(nombre);
  console.log(profesion);
  console.log(inforel);
  console.log(numtel);

  // Realizar la petición a través de Axios
  axios.post('https://app-2d64e7c9-c8c0-4a1d-a9a3-13fa174719d3.cleverapps.io/api/agendas/', {
    nombre: nombre,
    profesion: profesion,
    inforel: inforel,
    numtel: numtel
  })
    .then(function (response) {
      location.reload();
      form.reset();
    })
    .catch(function (error) {
      console.log(error);
    });
});