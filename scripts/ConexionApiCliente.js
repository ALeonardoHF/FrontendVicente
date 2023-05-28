const form = document.getElementById('clienteForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    console.log(nombre);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    if (password !== confirmPassword) {
        alert("El password debe coincidir.!");
        return;
    }

    //   Realizar la petición a través de Axios
    axios.post('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/clientes/', {
        nombre: nombre,
        email: email,
        password: password
    })
        .then(function (response) {
            redirectToLoginCliente();
        })
        .catch(function (error) {
            console.log(error);
        });
});

function redirectToLoginCliente() {
      window.location.href = "Log_In_Cliente.html";
  }