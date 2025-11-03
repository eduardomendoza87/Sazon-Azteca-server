# 🌶️ Sazón Azteca - Servidor (Backend)

Este repositorio contiene el código fuente del "Servidor" (Backend) para el proyecto Sazón Azteca.

Este proyecto es el "cerebro" y la "cocina" del restaurante. Es una **API RESTful** construida con **Node.js** y **Express**, responsable de gestionar la base de datos (menú, reservas, blog) y la lógica de negocio.

## Stack Tecnológico

* **Servidor:** Node.js, Express
* **Base de Datos:** MySQL
* **ORM:** Sequelize (con `sequelize-cli` para migraciones)
* **Autenticación:** (Próximamente) JWT (JSON Web Tokens)
* **Variables de Entorno:** `dotenv`

## 🚀 Cómo ejecutar localmente

Sigue estos pasos para levantar el entorno de desarrollo del servidor:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/raices-sazon-server.git](https://github.com/tu-usuario/raices-sazon-server.git)
    cd Sazon-azteca-server
    ```

2.  **Configurar Base de Datos:**
    * Asegúrate de tener **MySQL** instalado y corriendo en tu máquina.
    * Crea una base de datos local. (El nombre por defecto es `sazon_azteca_db`).

3.  **Configurar Variables de Entorno:**
    * Crea un archivo `.env` en la raíz del proyecto.
    * Copia el contenido de `.env.example` (si existe) o añade las siguientes variables:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=[tu_contraseña_de_mysql]
    DB_NAME=sazon_azteca_db
    ```

4.  **Instalar dependencias:**
    ```bash
    npm install
    ```

5.  **Ejecutar las Migraciones de la Base de Datos:**
    (Este comando leerá la carpeta `migrations` y creará todas las tablas en tu BD).
    ```bash
    npx sequelize-cli db:migrate
    ```

6.  **Ejecutar el servidor de desarrollo:**
    (Esto levanta la API en `http://localhost:3001` y se reiniciará automáticamente con `nodemon`).
    ```bash
    npm run dev
    ```

## Comandos Útiles de Sequelize

* `npx sequelize-cli db:migrate`: Ejecuta las migraciones pendientes.
* `npx sequelize-cli db:migrate:undo`: Revierte la última migración.
* `npx sequelize-cli model:generate`: Crea un nuevo modelo y su migración.