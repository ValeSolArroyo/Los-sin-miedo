function response_received(response) {
    return response.json();
}

function parse_data(content) {
    const container = document.getElementById("usuario");

    const usuario_info = document.createElement("div");
    usuario_info.setAttribute("class", "mb-4");
    usuario_info.innerHTML = `<h2>Perfil de ${content.usuario}</h2>`;
    container.appendChild(usuario_info);

    // Mostrar juegos del usuario si los tiene
    if (content.juegos && content.juegos.length > 0) {
        content.juegos.forEach(juego => {
            const item = document.createElement("div");
            item.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-2");

            const card = document.createElement("div");
            card.setAttribute("class", "card");

            const card_body = document.createElement("div");
            card_body.setAttribute("class", "card-body");

            const titulo = document.createElement("h5");
            titulo.setAttribute("class", "card-title");
            titulo.textContent = juego.nombre;

            const link = document.createElement("a");
            link.setAttribute("href", `juego?id=${juego.id}`);

            const imagen = document.createElement("img");
            imagen.setAttribute("class", "card-img-top mb-2");
            imagen.setAttribute("src", juego.imagen);

            const precio = document.createElement("p");
            precio.setAttribute("class", "card-text");
            precio.textContent = `Precio: ${juego.precio} $`;

            const fecha = document.createElement("p");
            fecha.setAttribute("class", "card-text");
            fecha.textContent = `Fecha de creación: ${juego.fecha_creacion}`;

            card_body.appendChild(titulo);
            card_body.appendChild(link);
            link.appendChild(imagen);
            card_body.appendChild(precio);
            card_body.appendChild(fecha);
            card.appendChild(card_body);
            item.appendChild(card);
            container.appendChild(item);
        });
    } else {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Este usuario no tiene juegos asociados.";
        container.appendChild(mensaje);
    }

    // Configurar el botón de edición de usuario
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");
    const editarUsuarioBtn = document.getElementById("editarUsuario");
    editarUsuarioBtn.setAttribute("href", `editar/index.html?id=${id}`);

    cargarJuegosDisponibles();
}

function cargarJuegosDisponibles() {
    fetch("http://localhost:5000/juegos")
        .then(response_received)
        .then(juegos => {
            const selectJuegos = document.getElementById("selectJuegos");

            juegos.forEach(juego => {
                const option = document.createElement("option");
                option.value = juego.id;
                option.textContent = juego.nombre;
                selectJuegos.appendChild(option);
            });
        })
        .catch(request_error);
}

function eliminar_usuario() {
    const confirmacion = confirm(`¿Estás seguro que quieres eliminar el usuario?`);
    if (!confirmacion) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    fetch(`http://localhost:5000/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(response_received)
    .then(data => {
        alert('Usuario eliminado exitosamente!');
        window.location.href = 'http://localhost:8000/';
    })
    .catch(request_error);
}

function asignarJuego() {
    const idUsuario = new URLSearchParams(window.location.search).get("id");
    const idJuego = document.getElementById("selectJuegos").value;

    fetch("http://localhost:5000/asignar_juego", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_usuario: idUsuario,
            id_juego: idJuego
        })
    })
    .then(response_received)
    .then(data => {
        alert('Juego asignado correctamente al usuario.');
        window.location.reload(); // Recargar la página para reflejar los cambios
    })
    .catch(request_error);
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

// Obtener el ID del usuario desde la URL y cargar sus datos
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

fetch(`http://localhost:5000/usuarios/${id}`)
    .then(response_received)
    .then(parse_data)
    .catch(request_error);
