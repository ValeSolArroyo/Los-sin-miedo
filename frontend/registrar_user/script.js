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
    fetch('http://localhost:5000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar usuario.');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuario registrado exitosamente!');
        window.location.href = 'http://localhost:8000/';
    })
    .catch(error => {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario.');
    });
}
