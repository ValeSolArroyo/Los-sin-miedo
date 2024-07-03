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