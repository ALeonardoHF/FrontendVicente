// lista de todo el inventario disponible

// Modificar la interfaz de inventario, para que los 2 inputs number sean min='0'
// y no puedas agregar negativos a cantidad y a precio

const tabla = document.querySelector("#tabla-reservaciones");
const cliente = localStorage.getItem("cliente");
const clienteJSON = JSON.parse(cliente);

    // Producción > https://app-2d64e7c9-c8c0-4a1d-a9a3-13fa174719d3.cleverapps.io/api/reservaciones/${clienteJSON.idCliente}
    // Desarrollo > http://localhost:3002/api/reservaciones/${clienteJSON.idCliente}
axios.get(`https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io/api/reservaciones/${clienteJSON.idCliente}`)
    .then(function (response) {
        response.data.forEach(function (dato) {

            const fechaIn = new Date(dato.CheckIn);
            const fechaOut = new Date(dato.CheckOut);

            const diaIn = fechaIn.getUTCDate().toString().padStart(2, '0');
            const mesIn = (fechaIn.getUTCMonth() + 1).toString().padStart(2, '0'); // ¡Recuerda que los meses son base 0!
            const anioIn = fechaIn.getUTCFullYear();
            const horasIn = fechaIn.getUTCHours().toString().padStart(2, '0') - 1;
            const minutosIn = fechaIn.getUTCMinutes().toString().padStart(2, '0');
            const segundosIn = fechaIn.getUTCSeconds().toString().padStart(2, '0');

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

    // https://app-f28b4b9e-0ca3-47b2-a6e1-3077c5a13b5b.cleverapps.io