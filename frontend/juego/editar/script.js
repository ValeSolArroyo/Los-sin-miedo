function response_received(response) {
    return response.json();
}

function handle_get_response(data) {
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('precio').value = data.precio;
    document.getElementById('fecha_creacion').value = data.fecha_creacion;
    document.getElementById('imagen').value = data.imagen;
}

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
    fetch("http://localhost:5000/juegos/"+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(juegoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al editar el juego.');
        }
        return response.json();
    })
    .then(data => {
        alert('Juego editado exitosamente!');
        window.location.href = 'http://localhost:8000/';
    })
    .catch(error => {
        console.error('Error al editar el juego:', error);
        alert('Error al editar el juego.');
    });
}

function request_error(error) {
    console.error("Error al realizar la solicitud:", error);
}

const parametros = window.location.search;
const id = new URLSearchParams(parametros).get("id");

document.getElementById('cancelar').setAttribute('href', `http://localhost:8000/juego/?id=${id}`);

fetch("http://localhost:5000/juegos/"+id)   
    .then(response_received)
    .then(handle_get_response)
    .catch(request_error);