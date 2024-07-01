from flask import Flask, request, jsonify
from models import db, Juego
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

port = 5000
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://usuario:contrasenia@localhost:5432/tienda'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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
                'fecha_creacion': juego.fecha_creacion
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
            'fecha_creacion': juego.fecha_creacion
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

        nuevo_juego = Juego(nombre=nuevo_nombre, precio=nuevo_precio, fecha_creacion=nueva_fecha_creacion)
        db.session.add(nuevo_juego)
        db.session.commit()

        return jsonify({'message': 'Juego creado exitosamente'})
    except Exception as e:
        return jsonify({'message': 'Error al crear juego', 'error': str(e)}), 500

if __name__ == '__main__':
    print('Iniciando servidor...')
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=port, debug=True)
    print('Servidor iniciado')