TQSoft Backend - Django REST + PostgreSQL

1) Crear entorno e instalar dependencias:
   python -m venv venv
   source venv/bin/activate   (en Windows: venv\Scripts\activate)
   pip install -r requirements.txt

2) Crear base de datos y usuario en PostgreSQL, por ejemplo:
   psql -U postgres
   CREATE DATABASE tqsoft_db;
   CREATE USER tqsoft_user WITH PASSWORD 'tqsoft_pass';
   GRANT ALL PRIVILEGES ON DATABASE tqsoft_db TO tqsoft_user;

3) Opcional: definir variables de entorno (si cambias nombre/usuario/clave):
   POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT

4) Aplicar migraciones:
   python manage.py makemigrations
   python manage.py migrate

5) Crear superusuario:
   python manage.py createsuperuser

6) Ejecutar el servidor:
   python manage.py runserver

Endpoints principales:
 - POST /api/auth/register/
 - POST /api/auth/login/        (JWT)
 - POST /api/contact/
 - GET/POST /api/portfolio/
