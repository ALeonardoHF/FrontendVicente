const loginForm = document.getElementById('clienteLogin');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('https://app-2d64e7c9-c8c0-4a1d-a9a3-13fa174719d3.cleverapps.io/api/auth/login/cliente', {
        email: email,
        password: password
    }).then(function (response) {
        console.log(response);
        localStorage.setItem("cliente", JSON.stringify(response.data));
        localStorage.setItem("loginCliente", true);
        redirectToNewPage()
    })
        .catch(function (error) {
            console.log(error);
        });
});

function redirectToNewPage() {
    const cliente = localStorage.getItem("cliente");
    const clienteJSON = JSON.parse(cliente);
    // Comprobar si se ha producido la condición
    if (localStorage.getItem("cliente")) {
        // Cambiar la ubicación de la página actual a la nueva página
        window.location.href = "Interfaz Cliente.html";
    } else {
        // Repetir la misma acción
        redirectToNewPage();
    }
}