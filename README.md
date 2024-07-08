# Los-sin-miedo
Es una pagina que es parecida a steam. Para que funcione la pagina tiene que seguir estos pasos.
___
## Base de datos
```sql
CREATE DATABASE tienda;

CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio INTEGER NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagen VARCHAR(200)
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(50) NOT NULL
);

CREATE TABLE usuario_juegos (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id) NOT NULL,
    id_juego INTEGER REFERENCES juegos(id) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    CONSTRAINT fk_juego FOREIGN KEY (id_juego) REFERENCES juegos(id)
);

```
## Requerimientos
```
pip install Flask
pip install Flask-SQLAlchemy
pip install Flask-Cors
pip install SQLAlchemy
pip install psycopg2
```
## Correr Backend

```bash
cd backend
python3 app.py
```

## Correr Frontend

```bash
cd frontend
python3 -m http.server
```
