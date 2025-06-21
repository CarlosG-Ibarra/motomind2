# MotoMind - Tienda de Cascos Inteligentes

Una aplicación web de React para la venta y personalización de cascos inteligentes para motociclistas.

## 📋 Prerrequisitos

Antes de ejecutar este proyecto, asegúrate de tener instalado en tu computadora:

- Node.js (versión 14.0 o superior)
- npm (viene incluido con Node.js)

### Instalación de Node.js y npm

1. Ve a [nodejs.org](https://nodejs.org)
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador y sigue las instrucciones
4. Verifica la instalación abriendo una terminal y ejecutando:

```bash
node --version
npm --version
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarlosG-Ibarra/motomind2
cd motomind
```

### 2. Instalar dependencias

Una vez que hayas clonado el repositorio, necesitas instalar todas las dependencias del proyecto:

```bash
npm install
```

Este comando descargará e instalará automáticamente todos los paquetes necesarios que están listados en el archivo `package.json`.

### 3. Configuración de Firebase

**Nota importante para proyecto **: Dado que este es un proyecto de clase, el archivo `firebaseConfig.js` con las credenciales de Firebase se encuentra incluido en el PDF entregado como parte de la documentación del proyecto. Para obtener las credenciales de configuración de Firebase necesarias para ejecutar la aplicación, consulta el contenido del PDF donde se encuentran los detalles del archivo `firebaseConfig.js`.

### 4. Ejecutar la aplicación

Para iniciar el servidor de desarrollo:

```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en [http://localhost:3000](http://localhost:3000)

## 🛠️ Comandos Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`
Ejecuta la aplicación en modo de desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

### `npm run build`
Construye la aplicación para producción en la carpeta `build`.

### `npm test`
Lanza el ejecutor de pruebas en modo interactivo.

### `npm run eject`
**Nota: esta es una operación de un solo sentido. Una vez que hagas eject, ¡no podrás volver atrás!**

## 🏍️ Características

- **Catálogo de Productos**: Visualiza los diferentes modelos de cascos inteligentes
- **Personalización**: Selecciona colores y sube imágenes personalizadas
- **Carrito de Compras**: Agrega productos al carrito con cantidades personalizadas
- **Navegación**: Interfaz intuitiva con React Router

### Modelos Disponibles

- **MotoMind L1** - $3,000 MXN
  - Sensores básicos y conectividad Bluetooth

- **MotoMind L2** - $4,000 MXN
  - Pantalla HUD y GPS integrado

- **MotoMind Pro** - $5,000 MXN
  - Visión nocturna y alertas de colisión

## 🔧 Dependencias Principales

- React
- React Router DOM
- Create React App