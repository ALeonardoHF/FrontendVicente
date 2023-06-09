const loginForm = document.getElementById('clienteLogin');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    axios.post('https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/auth/login/cliente', {
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