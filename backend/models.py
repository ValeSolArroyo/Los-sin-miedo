import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Juego(db.Model):
    __tablename__ = 'juegos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.datetime.today())
    imagen = db.Column(db.String(200))

class User(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(50), nullable=False)

class UserJuego(db.Model):
    __tablename__='usuario_juegos'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_juego = db.Column(db.Integer, db.ForeignKey('juegos.id'), nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.datetime.now) #or today()?
    usuario = db.relationship('Usuarios')
    juego = db.relationship('Juegos')