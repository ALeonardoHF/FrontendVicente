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
  axios.post('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/agendas/', {
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