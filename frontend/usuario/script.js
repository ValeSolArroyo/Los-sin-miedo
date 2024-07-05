function response_received(response) {
    return response.json();
}

function parse_data(content) {
    const container = document.getElementById("usuario");

    content.forEach(usuario => {
        const item = document.createElement("div");
        item.setAttribute("class", "col-md-6 offset-md-3 text-center");

        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");

        const titulo = document.createElement("h1");
        titulo.setAttribute("class", "card-title mt-3 mb-0");
        titulo.textContent = usuario.usuario;

        const email = document.createElement("p");
        email.setAttribute("class", "card-text");
        email.textContent = `Email: ${usuario.email}`;

        const botones = document.createElement("div");
        botones.setAttribute("class", "botones");

        const editarButton = document.createElement("a");
        editarButton.setAttribute("class", "btn btn-warning mb-3");
        editarButton.setAttribute("href", `/usuario/editar/?id=${usuario.id}`);
        editarButton.textContent = "Editar usuario";

        const eliminarButton = document.createElement("button");
        eliminarButton.setAttribute("class", "btn btn-danger");
        eliminarButton.textContent = "Eliminar usuario";
        eliminarButton.onclick = () => eliminar_usuario(usuario.id);

        botones.appendChild(editarButton);
        botones.appendChild(eliminarButton);

        card_body.appendChild(titulo);
        card_body.appendChild(email);
        card_body.appendChild(botones);
        card.appendChild(card_body);
        item.appendChild(card);
        container.appendChild(item);
    });
}

function eliminar_usuario(id) {
    const confirmacion = confirm(`Estas seguro que quieres eliminar el usuario?`);
    if (!confirmacion) {
        return;
    }

    fetch(`http://localhost:5000/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(response_received)
    .then(data => {
        alert('Usuario eliminado exitosamente!');
        window.location.reload();
    })
    .catch(request_error);
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

fetch("http://localhost:5000/usuarios")
    .then(response_received)
    .then(parse_data)
    .catch(request_error);
