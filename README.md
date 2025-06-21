MotoMind - Tienda de Cascos Inteligentes
Una aplicación web de React para la venta y personalización de cascos inteligentes para motociclistas.
📋 Prerrequisitos
Antes de ejecutar este proyecto, asegúrate de tener instalado en tu computadora:

Node.js (versión 14.0 o superior)
npm (viene incluido con Node.js)

Instalación de Node.js y npm

Ve a nodejs.org
Descarga la versión LTS (recomendada)
Ejecuta el instalador y sigue las instrucciones
Verifica la instalación abriendo una terminal y ejecutando:
bashnode --version
npm --version


🚀 Instalación y Configuración
1. Clonar el repositorio
bashgit clone https://github.com/tu-usuario/motomind.git
cd motomind
2. Instalar dependencias
Una vez que hayas clonado el repositorio, necesitas instalar todas las dependencias del proyecto:
bashnpm install
Este comando descargará e instalará automáticamente todos los paquetes necesarios que están listados en el archivo package.json.
3. Ejecutar la aplicación
Para iniciar el servidor de desarrollo:
bashnpm start
La aplicación se abrirá automáticamente en tu navegador en http://localhost:3000
📁 Estructura del Proyecto
motomind/
├── public/
├── src/
│   ├── Components/
│   │   ├── CartContext.js
│   │   ├── CascoL1.js
│   │   ├── CascoL2.js
│   │   ├── CascoPro.js
│   │   ├── Productos.js
│   │   └── ...
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
🛠️ Comandos Disponibles
En el directorio del proyecto, puedes ejecutar:
npm start
Ejecuta la aplicación en modo de desarrollo.
Abre http://localhost:3000 para verla en el navegador.
npm run build
Construye la aplicación para producción en la carpeta build.
npm test
Lanza el ejecutor de pruebas en modo interactivo.
npm run eject
Nota: esta es una operación de un solo sentido. Una vez que hagas eject, ¡no podrás volver atrás!
🏍️ Características

Catálogo de Productos: Visualiza los diferentes modelos de cascos inteligentes
Personalización: Selecciona colores y sube imágenes personalizadas
Carrito de Compras: Agrega productos al carrito con cantidades personalizadas
Navegación: Interfaz intuitiva con React Router

Modelos Disponibles

MotoMind L1 - $3,000 MXN

Sensores básicos y conectividad Bluetooth


MotoMind L2 - $4,000 MXN

Pantalla HUD y GPS integrado


MotoMind Pro - $5,000 MXN

Visión nocturna y alertas de colisión



🔧 Dependencias Principales

React
React Router DOM
Create React App