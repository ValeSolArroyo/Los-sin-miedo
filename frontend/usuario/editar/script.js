function response_received(response) {
    return response.json();
}

function handle_get_response(data) {
    document.getElementById('usuario').value = data.usuario;
    document.getElementById('email').value = data.email;
    document.getElementById('contraseña').value = data.contraseña;
}

document.getElementById('usuarioForm').addEventListener('submit', manejarEnvioFormulario);

function manejarEnvioFormulario(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    const usuarioData = {
        usuario: usuario,
        email: email,
        contraseña: contraseña
    };

    enviarUsuario(usuarioData);
}

function enviarUsuario(usuarioData) {
    fetch("http://localhost:5000/usuarios/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al editar el usuario.');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuario editado exitosamente!');
        window.location.href = 'http://localhost:8000/usuario';
    })
    .catch(error => {
        console.error('Error al editar el usuario:', error);
        alert('Error al editar el usuario.');
    });
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

const parametros = window.location.search;
const id = new URLSearchParams(parametros).get("id");

fetch("http://localhost:5000/usuarios/" + id)
    .then(response_received)
    .then(handle_get_response)
    .catch(request_error);
