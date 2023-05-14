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
  axios.post('http://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/agendas/', {
    nombre: nombre,
    profesion: profesion,
    inforel: inforel,
    numtel: numtel
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // mostrar los cambios dinamicos con una pequeña recarga de la pagina
    location.reload();
});