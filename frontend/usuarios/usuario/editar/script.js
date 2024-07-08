function response_received(response) {
    return response.json();
}

function handle_get_response(data) {
    document.getElementById('usuario').value = data.usuario;
    document.getElementById('email').value = data.email;
    // La contraseña no se debe cargar por seguridad
}

document.addEventListener("DOMContentLoaded", function() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");
    document.getElementById('cancelar').setAttribute('href', `http://localhost:8000/usuarios/usuario/?id=${id}`);
    if (!id) {
        console.error("ID de usuario no encontrado en la URL.");
        alert("Error: ID de usuario no encontrado.");
        return;
    }

    // Cargar datos del usuario para editar
    fetch(`http://localhost:5000/usuarios/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('usuario').value = data.usuario;
            document.getElementById('email').value = data.email;
        })
        .catch(error => {
            console.error('Error al cargar datos del usuario:', error);
            alert('Error al cargar datos del usuario.');
        });

    // Manejar envío del formulario para actualizar el usuario
    document.getElementById('usuarioForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const contraseña = document.getElementById('contraseña').value;

        const usuarioData = {
            usuario: usuario,
            email: email,
            contraseña: contraseña
        };

        // Enviar datos del usuario actualizados al servidor
        fetch(`http://localhost:5000/usuarios/${id}`, {
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
            window.location.href = `http://localhost:8000/usuarios/usuario/?id=${id}`;
        })
        .catch(error => {
            console.error('Error al editar el usuario:', error);
            alert('Error al editar el usuario.');
        });
    });
});


