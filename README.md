# edgeapp
### 1) Clonar el repositorio e instalar las dependencias
``` 
git clone https://github.com/elvus/edgeapp.git
cd edgeapp
npm install
```
### 2) Instalar MongoDB
Tutorial: https://docs.mongodb.com/manual/administration/install-community/
### 3) Configurar el archivo .env
Copiar el archivo .env.example y renombrarlo a .env
```
En DBNAME va el nombre que queremos que tenga nuestra base de datos
En TOKEN_SECRET va la frase con la cual cifraremos nuestro JWT 
```
### 4) Correr la app con el comando
```
npm run dev
```
En el navegador verifica que la api este corriendo en la sgte url   
`http://localhost:3000`   
Deberia aparecer el mensaje `it works` con el state `true`
### 5) Insert dummy data
```
npm run dummy
```
### REST API Endpoints
==================

* *POST* `http://localhost:3000/api/login`
```
{
    body:{
	email:'elpepe@email.com',
	password:'123'
    }
    headers:{
        'Content-Type': 'application/json',
  }
}
```
* *POST* `http://localhost:3000/api/login/register`
```
    {
	name: 'elpepe'
        email:'elpepe@email.com',
	password:'123'
    }
    headers:{
        'Content-Type': 'application/json'
    }
```
* *GET* `http://localhost:3000/api/users`
```
    headers:{
        'Content-Type': 'application/json',
        'auth-token':'token_obtenido_al_realizar_login'
    }
```
*PUT* `http://localhost:3000/api/users`
```
    {
    	name: 'NuevoNombre'
        email:'elpepe@email.com',
	password:'123'
    }
    headers:{
        'Content-Type': 'application/json',
	'auth-token':'token_obtenido_al_realizar_login'
    }
```
*DELETE* `http://localhost:3000/api/users`
```
    {
        email:'elpepe@email.com',
	password:'123'
    }
    headers:{
        'Content-Type': 'application/json',
	'auth-token':'token_obtenido_al_realizar_login'
    }
```