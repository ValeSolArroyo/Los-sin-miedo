document.getElementById('juegoForm').addEventListener('submit', manejarEnvioFormulario);

function manejarEnvioFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const fecha_creacion = document.getElementById('fecha_creacion').value;
    const imagen = document.getElementById('imagen').value;

    const fechaISO = formatoFecha(fecha_creacion);

    const juegoData = {
        nombre: nombre,
        precio: precio,
        fecha_creacion: fechaISO,
        imagen: imagen
    };

    enviarJuego(juegoData);
}

function formatoFecha(fecha) {
    const partes = fecha.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];
    return `${ano}-${mes}-${dia}`;
}

function enviarJuego(juegoData) {
    fetch('http://localhost:5000/juegos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(juegoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el juego.');
        }
        return response.json();
    })
    .then(data => {
        alert('Juego agregado exitosamente!');
        window.location.href = 'http://localhost:8000/';
    })
    .catch(error => {
        console.error('Error al agregar el juego:', error);
        alert('Error al agregar el juego.');
    });
}