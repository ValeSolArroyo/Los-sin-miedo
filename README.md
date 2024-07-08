# Los-sin-miedo
Es una pagina que es parecida a steam. Para que funcione la pagina tiene que seguir estos pasos.
___
## Base de datos
```sql
CREATE DATABASE tienda;
```
### Se debe modificar la siguiente linea en el app.py con las credenciales correctas para la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:postgres@localhost:5432/tienda'


## Si se quiere instalar un venv puede hacer lo siguiente
```bash
python3 -m venv venv
source venv/bin/activate
```

## Requerimientos
```bash
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
