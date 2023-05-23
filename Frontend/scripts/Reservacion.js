// lista de todo el inventario disponible

// Modificar la interfaz de inventario, para que los 2 inputs number sean min='0'
// y no puedas agregar negativos a cantidad y a precio

const tabla = document.querySelector("#tabla-reservaciones");
const cliente = localStorage.getItem("cliente");
const clienteJSON = JSON.parse(cliente);

axios.get(`https://app-bc0dc83c-1d65-4372-933f-60eb4283de54.cleverapps.io/api/reservaciones/${clienteJSON.idCliente}`)
    .then(function (response) {
        response.data.forEach(function (dato) {

            const fechaIn = new Date(dato.CheckIn);
            const fechaOut = new Date(dato.CheckOut);

            const diaIn = fechaIn.getDate().toString().padStart(2, '0');
            const mesIn = (fechaIn.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
            const anioIn = fechaIn.getFullYear();
            const horasIn = fechaIn.getHours().toString().padStart(2, '0');
            const minutosIn = fechaIn.getMinutes().toString().padStart(2, '0');
            const segundosIn = fechaIn.getSeconds().toString().padStart(2, '0');

            const fechaFormateadaIn = `${diaIn}-${mesIn}-${anioIn} ${horasIn}:${minutosIn}:${segundosIn}`;

            const diaOut = fechaOut.getDate().toString().padStart(2, '0');
            const mesOut = (fechaOut.getMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
            const anioOut = fechaOut.getFullYear();
            const horasOut = fechaOut.getHours().toString().padStart(2, '0');
            const minutosOut = fechaOut.getMinutes().toString().padStart(2, '0');
            const segundosOut = fechaOut.getSeconds().toString().padStart(2, '0');

            const fechaFormateadaOut = `${diaOut}-${mesOut}-${anioOut} ${horasOut}:${minutosOut}:${segundosOut}`;

            const fechaHoy = new Date();
            let caducidad;

            if (fechaHoy > fechaOut) {
                caducidad = 'Vencida'
            } else {
                caducidad = 'Válida'
            }

            const fila = document.createElement("tr");

            fila.innerHTML = `
            <td>${fechaFormateadaIn}</td>
            <td>${fechaFormateadaOut}</td>
            <td>${dato.TiempoEstancia} hrs</td>
            <td>${dato.CodigoAuth}</td>
            <td>${dato.Telefono}</td>
            <td>${dato.Huespedes}</td>
            <td>$ ${dato.Precio}</td>
            <td>${caducidad}</td>
            `;

            tabla.appendChild(fila);

        });
    })
    .catch(function (error) {
        console.log(error);
    });

    function redirectToRegistration() {
        window.location.href = "Interfaz Cliente.html";
    }

    function logOutCliente() {
        localStorage.removeItem("cliente");
        localStorage.removeItem("loginCliente");
        window.location.href = "Log_In_Cliente.html";
    }