function response_received(response) {
    return response.json();
}

function parse_data(content) {
    const container = document.getElementById("juego");

    const item = document.createElement("div");
    item.setAttribute("class", "col-md-6 offset-md-3 text-center");

    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const imagen = document.createElement("img");
    imagen.setAttribute("class", "card-img-top");
    imagen.setAttribute("src", content.imagen);
    imagen.setAttribute("alt", content.nombre);
    imagen.style.width = "100%";
    imagen.style.height = "auto";
    imagen.style.objectFit = "cover";

    const card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");

    const titulo = document.createElement("h1");
    titulo.setAttribute("class", "card-title mt-3 mb-0");
    titulo.textContent = content.nombre;

    const fecha = document.createElement("p");
    fecha.setAttribute("class", "card-text");
    fecha.textContent = `Fecha de creación: ${content.fecha_creacion}`;

    const precio = document.createElement("p");
    precio.setAttribute("class", "card-text");
    precio.textContent = `Precio: ${content.precio} $`;

    card_body.appendChild(titulo);
    card_body.appendChild(imagen);
    card_body.appendChild(fecha);
    card_body.appendChild(precio);
    card.appendChild(card_body);
    item.appendChild(card);
    container.appendChild(item);
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

let parametros = window.location.search;
let id = new URLSearchParams(parametros).get("id");

fetch("http://localhost:5000/juegos/"+id)   
    .then(response_received)
    .then(parse_data)
    .catch(request_error);