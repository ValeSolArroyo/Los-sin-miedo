function response_received(response) {
    return response.json();
}

function parse_data(content) {
    const container = document.getElementById("usuarios");
    content.forEach(usuario => {
        const item = document.createElement("div");
        item.setAttribute("class", "col-6 col-md-4 col-lg-3 col-xl-2");

        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");

        const nombre = document.createElement("h5");
        nombre.setAttribute("class", "card-title");
        nombre.textContent = usuario.usuario;

        const link = document.createElement("a");
        link.setAttribute("href", `usuario?id=${usuario.id}`);

        card_body.appendChild(link);
        link.appendChild(nombre);
        card.appendChild(card_body);
        item.appendChild(card);
        container.appendChild(item);
    });
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

fetch("http://localhost:5000/usuarios")
    .then(response_received)
    .then(parse_data)
    .catch(request_error);