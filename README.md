# -Modulo5-Actividad-2

Semana 2
 
Actividad
Actividad 2
Se pide diseñar e implementar el API CRUD para un modelo "Post" que de servicio a parte de la colección Postman con la que venimos trabajando.
1. Diseño modelo
Diseñar un modelo Mongoose de "Post" con al menos los siguientes campos y validaciones en su esquema:
- id: string
- createdAt: Date
- updatedAt: Date
- title: string, requerido, más de 5 caracteres
- text: string, requerido, más de 5 caracteres
- author: string, requerido

1. Diseño API CRUD HTTP
Codificar los siguientes endpoints de acceso público (sin autenticación necesaria)
1. POST /api/posts
- Recibe body JSON con los campos title, text y author.
- Devuelve HTTP 201 con el detalle JSON del Post creado en la Base de Datos en memoria
- Devuelve HTTP 400 si hay errores en la validación del body de la petición contra el esquema definido

2. GET /api/posts
- Devuelve HTTP 200 OK con el listado JSON de posts almacenados en la Base de Datos en memoria

3. GET /api/posts/<id>
- Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria
- Devuelve 404 si el post no existe en la Base de Datos en memoria

4. PATCH /api/posts/<id>
- Recibe body JSON con alguno de los campos title, text y author.
- Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria tras modificar sus atributos con lo indicado en el body
- Devuelve 404 si el post no existe en la Base de Datos en memoria

5. DELETE /api/posts/<id>
- Devuelve HTTP 204 tras eliminar el post id == <id> de la Base de Datos en memoria
- Devuelve 404 si el post no existe en la Base de Datos en memoria
 
 
 
 ACT 3 Sobre el mismo CRUD de Posts, en esta ocasión añadiremos un nuevo modelo de usuario y expondremos endpoints para login

1. Diseño modelo User
Diseñar y programar un modelo Mongoose "User" con al menos los siguientes campos y validaciones en su esquema:
- name, string, requerido
- email, string, requerido, formato email
- password, string, requerido
- bio, string.
- active: boolean. Default false
- createdAt: Date,
- updatedAt: Date.

2. API HTTP
Codificar los siguientes endpoints HTTP sobre el API:

POST /api/users
- No necesita estar autenticada
- Recibe body JSON con los campos name, email, password y bio
- Almacena el usuario en Base de Datos en memoria cifrando su contraseña

3. POST /api/login
- Recibe body con email, password
- Devuelve HTTP 200 OK con token JWT de sesión si las credenciales son correctas
- Devuelve HTTP 400 en caso de error en la validación de datos
- Devuelve HTTP 401 si las credenciales no son correctas

4. El resto de endpoints de nuestra API (CRUD de Posts) deben requerir autenticación y devolver código HTTP 401 ante peticiones no autenticadas.
 
 ACT 4 Confirmación de registro

Tras crear un usuario (POST /api/users) éste se creara con el campo active: false. El servidor enviará un email a la dirección de correo de registro compartiendo una URL con la que el usuario que reciba el correo pueda hacer GET para modificar el campo "active" de su cuenta a valor "true".

NOTA: no es necesario enviar un email. El enlace de validación de cuenta puede ser accedido sin necesidad de enviar un email.

Solo usuarios con el campo active == true podrán hacer login (POST /api/login)
