## Proyecto basico API REST

### Descripción
Se proporcionan API's para la gestión de productos, usuarios y carritos de compra, todas las rutas se encuentran protegidas a excepción de:
- POST api/v1/auth/login (autenticación de usuarios)
- POST api/v1/users (creación de usuarios)
- GET api/v1/cart (listado de todos los carritos)

### Instrucciones de instalación
1. Instalar nodemon de forma global:
```
npm install -g nodemon
```

2. Instalar dependencias del proyecto:
```
npm install
```

3. Renombrar o crear un nuevo archivo .env en base al archivo .env.sample, configurar el puerto requerido para el servidor

4. Ejecutar el servidor
```
npm run dev
```
