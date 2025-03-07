# Proyecto Final
 
Para tener el proyecto en local, primero ha que abrir la terminal desde la ruta que se desee descargar el proyecto y colocar el siguiente comando:
 
- git clone https://github.com/MoralesR-2020045/Bimonthly-Project.git
 
Para poder iniciar el proyecto hay que abrir la consola dentro la carpeta del proyecto y colocar el siguiente comando para poder instalar las dependencias:
 
- npm i
 
Este comando intstalará las dependencias requeridas, luego para ejecutar el proyecto se debe ingresar el siguiente comando:
 
- npm run dev

 
> [!WARNING]
> Si no se sigue este siguiente punto no se podrá ejecutar correctamente este proyecto.
 
En este punto el servidor ya correrá en cierto puerto pero para poder ejecutar el programa correctamente, hay que acceder al archivo .env y extraer el dato de: "URI_DATABASE"
 
Luego extraer la data que se encuentra en la carpeta configs/data/, y ahí se encontrarán los archivos para la base de datos.
 
En casi la misma ruta /configs , se encuentran la colleción de endpoints para probrar el programa en postman.
 
> [!CAUTION]
> Para que la documentación funciones el servidor debe estar activo/corriendo.
 
Para acceder a la documentación Swagger hay que escribir esta ruta en el navegador http://127.0.0.1:3005/api-docs
 
 
# Credenciales
>Como anteriormente ya hemos introducido la data de mongoDB, entonces solo debemos logearnos como Admin o User dependiendo que acciones queramos hacer 

> # Admin Acciones
    > El admin tiene acceso a las siguientes funcionalidades:

    > Agregar, editar y eliminar. Categorias
    > Agregar, editar y eliminar. Productos
    > Agregar, modificar rol de un usuario, editar la información de un usuario, eliminar un usuario. Usuarios

> # Usuario Acciones
    > El usuario tiene acceso a las siguientes funcionalidades:

    > Registrarse e Iniciar Sesion.
    > Editar su perfil
    > Eliminación de su cuenta.
    > Uso de un carrito de compras
    > Proceso de compra.
    > Acceso que le genera su factura.
    > Historial de Compras.

