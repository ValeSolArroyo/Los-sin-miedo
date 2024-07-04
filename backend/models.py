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

    usuarios = db.relationship('UserJuego', back_populates='juego')



class User(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contraseña = db.Column(db.String(50), nullable=False)

    juegos = db.relationship('UserJuego', back_populates='usuario')


class UserJuego(db.Model):
    __tablename__ = 'usuario_juegos'
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    id_juego = db.Column(db.Integer, db.ForeignKey('juegos.id'), nullable=False)
    fecha_creacion = db.Column(db.DateTime, default=datetime.datetime.now)

    usuario = db.relationship('User', foreign_keys=[id_usuario], back_populates='juegos')
    juego = db.relationship('Juego', foreign_keys=[id_juego], back_populates='usuarios')
