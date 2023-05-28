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
  axios.post('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/inventarios/', {
    nombre: producto,
    precio: auxPrecio,
    cantidad: cantidad,
    venta: auxVenta
  })
    .then(function (response) {
      form.reset();
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });

});