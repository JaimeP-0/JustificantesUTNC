# Sistema de Justificantes UT

Sistema web y móvil para la gestión de justificantes de una universidad, desarrollado con Astro, Tailwind CSS y Apache Cordova.

## 🚀 Características

- **Login**: Autenticación para alumnos y maestros con detección automática de tipo
- **Formulario de Justificantes**: Los alumnos pueden enviar justificantes con comprobantes
- **Dashboard de Maestros**: Panel de control para gestionar y revisar justificantes
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- **Multiplataforma**: Funciona en Web y Android (próximamente)

## 📁 Estructura del Proyecto

```
/
├── public/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Página principal
│   │   ├── login.astro          # Página de login
│   │   ├── alumno/
│   │   │   └── formulario.astro # Formulario para enviar justificantes
│   │   └── maestro/
│   │       └── dashboard.astro  # Dashboard de maestros
│   └── styles/
│       └── global.css           # Estilos globales con Tailwind
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

### Desarrollo Web (Astro)

| Comando                | Acción                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Instala las dependencias                        |
| `npm run dev`          | Inicia el servidor de desarrollo en `localhost:15005` |
| `npm run build`        | Construye el sitio para Cordova en `./www/` |
| `npm run preview`      | Previsualiza la construcción localmente         |

### Cordova (Web y Móvil)

| Comando                | Acción                                           |
| :--------------------- | :----------------------------------------------- |
| `npm run build:cordova` | Compila Astro y prepara Cordova                |
| `npm run preview:cordova` | Sirve la aplicación con Cordova (web)         |
| `npm run cordova:run:web` | Ejecuta la aplicación en el navegador         |
| `npm run cordova:build:web` | Compila para web completa                    |

## 📄 Páginas Disponibles

- `/` - Página principal
- `/login` - Login para alumnos y maestros
- `/alumno/formulario` - Formulario para enviar justificantes
- `/maestro/dashboard` - Dashboard de control para maestros

## 🛠️ Tecnologías

- **Astro**: Framework web moderno
- **Tailwind CSS**: Framework de CSS utility-first
- **Apache Cordova**: Framework para aplicaciones móviles multiplataforma
- **TypeScript**: Tipado estático

## 📱 Plataformas Soportadas

- ✅ **Web**: Funcional y lista para usar
- 🔄 **Android**: Configuración pendiente (requiere Android SDK)
- ⏳ **iOS**: No soportado actualmente

## 🔐 Credenciales de Prueba

### Alumno
- Matrícula: `10011001`
- Contraseña: `alumno123`

### Maestro
- Matrícula: `1001`
- Contraseña: `maestro123`
