from flask import Flask, request, jsonify
from models import db, Juego, User
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

port = 5000
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@localhost:5432/testeo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/juegos', methods=['GET'])
def obtener_juegos():
    try:
        juegos = Juego.query.all()
        juegos_data = []
        for juego in juegos:
            juego_data = {
                'id': juego.id,
                'nombre': juego.nombre,
                'precio': juego.precio,
                'fecha_creacion': juego.fecha_creacion.strftime('%d/%m/%Y'),
                'imagen': juego.imagen
            }
            juegos_data.append(juego_data)
        return jsonify(juegos_data)
    except Exception as e:
        return jsonify({'message': 'Error al obtener juegos', 'error': str(e)}), 500

@app.route('/juegos/<int:id>', methods=['GET'])
def obtener_juego_por_id(id):
    try:
        juego = Juego.query.filter_by(id=id).first()

        if not juego:
            return jsonify({'message': 'Juego no encontrado'}), 404

        juego_data = {
            'id': juego.id,
            'nombre': juego.nombre,
            'precio': juego.precio,
            'fecha_creacion': juego.fecha_creacion.strftime('%d/%m/%Y'),
            'imagen': juego.imagen
        }
        return jsonify(juego_data)
    except Exception as e:
        return jsonify({'message': 'Error al obtener juego', 'error': str(e)}), 500

@app.route('/juegos', methods=['POST'])
def crear_juego():
    try:
        data = request.json
        nuevo_nombre = data['nombre']
        nuevo_precio = data['precio']
        nueva_fecha_creacion = data['fecha_creacion']
        nueva_imagen = data['imagen']

        nuevo_juego = Juego(nombre=nuevo_nombre, precio=nuevo_precio, fecha_creacion=nueva_fecha_creacion, imagen=nueva_imagen)
        db.session.add(nuevo_juego)
        db.session.commit()

        return jsonify({'message': 'Juego creado exitosamente'})
    except Exception as e:
        return jsonify({'message': 'Error al crear juego', 'error': str(e)}), 500

@app.route('/juegos/<int:id>', methods=['DELETE'])
def eliminar_juego(id):
    try:
        juego = Juego.query.get(id)

        if not juego:
            return jsonify({'message': 'Juego no encontrado'}), 404

        db.session.delete(juego)
        db.session.commit()

        return jsonify({'message': 'Juego eliminado exitosamente'})
    except Exception as e:
        return jsonify({'message': 'Error al eliminar juego', 'error': str(e)}), 500

@app.route('/juegos/<int:id>', methods=['PUT'])
def editar_juego(id):
    try:
        juego = Juego.query.get(id)

        if not juego:
            return jsonify({'message': 'Juego no encontrado'}), 404

        data = request.json

        juego.nombre = data.get('nombre', juego.nombre)
        juego.precio = data.get('precio', juego.precio)
        juego.fecha_creacion = data.get('fecha_creacion', juego.fecha_creacion)
        juego.imagen = data.get('imagen', juego.imagen)

        db.session.commit()

        return jsonify({'message': 'Juego editado exitosamente'})
    except Exception as e:
        return jsonify({'message': 'Error al editar juego', 'error': str(e)}), 500

# Crear un usuario
@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    try:
        data = request.json
        usuario = data['usuario']
        email = data['email']
        contraseña = data['contraseña']

        nuevo_usuario = User(usuario=usuario, email=email, contraseña=contraseña)
        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({'message': 'Usuario creado correctamente', 'id': nuevo_usuario.id}), 201
    except KeyError as e:
        return jsonify({'message': 'Falta un campo requerido', 'error': str(e)}), 400
    except Exception as e:
        return jsonify({'message': 'Error interno del servidor', 'error': str(e)}), 500

# Obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        usuarios = User.query.all()
        usuarios_data = []
        for usuario in usuarios:
            usuario_data = {
                'id': usuario.id,
                'usuario': usuario.usuario,
                'email': usuario.email,
            }
            usuarios_data.append(usuario_data)
        return jsonify(usuarios_data)
    except Exception as e:
        return jsonify({'message': 'Error al obtener usuarios', 'error': str(e)}), 500

# Obtener un usuario por ID
@app.route('/usuarios/<int:id>', methods=['GET'])
def obtener_usuario_por_id(id):
    try:
        usuario = User.query.get(id)

        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        usuario_data = {
            'id': usuario.id,
            'usuario': usuario.usuario,
            'email': usuario.email,
        }
        return jsonify(usuario_data)
    except Exception as e:
        return jsonify({'message': 'Error al obtener usuario', 'error': str(e)}), 500

# Actualizar un usuario
@app.route('/usuarios/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    try:
        usuario = User.query.get(id)

        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        data = request.json
        usuario.usuario = data.get('usuario', usuario.usuario)
        usuario.email = data.get('email', usuario.email)
        usuario.contraseña = data.get('contraseña', usuario.contraseña)

        db.session.commit()

        return jsonify({'message': 'Usuario actualizado correctamente'}), 200
    except Exception as e:
        return jsonify({'message': 'Error interno del servidor', 'error': str(e)}), 500

# Eliminar un usuario
@app.route('/usuarios/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        usuario = User.query.get(id)

        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        db.session.delete(usuario)
        db.session.commit()

        return jsonify({'message': 'Usuario eliminado correctamente'}), 200
    except Exception as e:
        return jsonify({'message': 'Error interno del servidor', 'error': str(e)}), 500


if __name__ == '__main__':
    print('Iniciando servidor...')
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=port, debug=True)