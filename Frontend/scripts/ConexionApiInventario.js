const form = document.getElementById('inventarioForm');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const producto = document.getElementById('producto').value;
  const cantidad = document.getElementById('cantidad').value;
  const precio = document.getElementById('precio').value;
  const venta = document.getElementById('venta').value;
  let auxVenta, auxPrecio;

  if (venta === "Si") {
    auxVenta = true;
  } else {
    auxVenta = false;
  }

  if (precio === null || precio < 0 || precio === 0) {
    auxPrecio = null;
  } else {
    auxPrecio = parseInt(precio);
  }

  // console.log(producto);
  // console.log(cantidad);
  // console.log(auxPrecio);
  // console.log(auxVenta);

  // Realizar la petición a través de Axios
  axios.post('http://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/inventarios/', {
    nombre: producto,
    precio: auxPrecio,
    cantidad: cantidad,
    venta: auxVenta
  })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    location.reload();
});