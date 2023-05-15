const form = document.getElementById('ventaForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const articulo = document.getElementById('articulo').value;
  const tipoarticulo = "Inventario Externo";
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;

  // Realizar la petición a través de Axios
  axios.post('https://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/ventas/', {
    articulo: articulo,
    tipoarticulo: tipoarticulo,
    precio: precio,
    cantidad: cantidad
  })
    .then(function (response) {
      form.reset(); 
      if (response.status == 200) {
        location.reload();
      }
    })
    .catch(function (error) {
      alert("Error, no existe el producto o la cantidad de venta supera el del inventario.");
    });
    
  // location.reload();
});