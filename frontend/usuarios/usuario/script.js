function response_received(response) {
    return response.json();
}

function parse_data(content) {
    const container = document.getElementById("usuario");

    const usuario_info = document.createElement("div");
    usuario_info.setAttribute("class", "mb-4");
    usuario_info.innerHTML = `<h2>Perfil de ${content.usuario}</h2>`;
    container.appendChild(usuario_info);

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
}

function eliminar_usuario() {
    const confirmacion = confirm(`Estas seguro que quieres eliminar el usuario?`)
    if (!confirmacion) {
        return;
    }

    fetch("http://localhost:5000/usuarios/" + id, {
        method: 'DELETE'
    })
    .then(response_received)
    .then(data => {
        alert('Usuario eliminado exitosamente!');
        window.location.href = 'http://localhost:8000/';
    })
    .catch(request_error);
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

const parametros = window.location.search;
const id = new URLSearchParams(parametros).get("id");

fetch("http://localhost:5000/usuarios/" + id)
    .then(response_received)
    .then(parse_data)
    .catch(request_error);