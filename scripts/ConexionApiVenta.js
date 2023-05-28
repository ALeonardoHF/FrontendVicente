const form = document.getElementById('ventaForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const articulo = document.getElementById('articulo').value;
  const tipoarticulo = "Inventario Externo";
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;

  // Realizar la petición a través de Axios
  axios.post('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/ventas/', {
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