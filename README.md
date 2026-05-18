# 🎨 Generador de Paletas de Colores

**Proyecto M1 — Betlienski Carolina S**

Herramienta web estática e interactiva que genera paletas de colores aleatorias de forma rápida e intuitiva. Desarrollada con HTML, CSS y JavaScript vanilla, sin frameworks ni dependencias externas.

---

## 📖 Manual de Usuario

### ¿Cómo usar la app?

Al abrir la aplicación, se genera automáticamente una paleta de 6 colores aleatorios en formato HEX. No necesitás hacer nada para empezar — la app ya está lista.

### Controles disponibles

#### 1. Seleccionar el tamaño de la paleta
En la barra de controles, hacé clic en uno de los botones de tamaño:

| Botón | Resultado |
|-------|-----------|
| `6`   | Genera 6 tarjetas de color |
| `8`   | Genera 8 tarjetas de color |
| `9`   | Genera 9 tarjetas de color |

El botón activo se resalta en negro. Al cambiar el tamaño, la paleta se regenera automáticamente.

#### 2. Seleccionar el formato de color
Elegí cómo querés ver los códigos de color:

| Botón | Formato | Ejemplo |
|-------|---------|---------|
| `HEX` | Hexadecimal | `#3AF92C` |
| `HSL` | Matiz, Saturación, Luminosidad | `hsl(210, 60%, 50%)` |

#### 3. Generar una nueva paleta
Hacé clic en el botón azul **"Generar paleta"** para crear un nuevo conjunto de colores aleatorios con la configuración actual.

#### 4. Copiar un color
Hacé clic sobre cualquier tarjeta de color para copiar su código al portapapeles. Aparecerá una notificación en la parte inferior de la pantalla confirmando la acción.

---

## ⚙️ Manual Técnico — Decisiones Técnicas

### Estructura del proyecto

```
ProyectoM1_CarolinaBetlienski/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

### Tecnologías utilizadas

| Tecnología | Versión | Rol |
|------------|---------|-----|
| HTML5 | — | Estructura semántica |
| CSS3 | — | Estilos y layout |
| JavaScript ES6 | — | Lógica e interactividad |
| Normalize.css | 8.0.1 | Reset de estilos entre navegadores |

### Decisiones de diseño

**HTML semántico**
Se utilizaron etiquetas semánticas (`<header>`, `<main>`, `<footer>`, `<section>`) para dar significado estructural al contenido. Se incluyó `role="status"` en el toast y `class="sr-only"` en el `<h2>` de controles para mejorar la accesibilidad con lectores de pantalla.

**CSS con variables (Custom Properties)**
Los colores, radios de borde y fuentes se definen en `:root` como variables CSS, lo que centraliza el sistema de diseño y facilita futuros cambios de tema.

**Layout con Flexbox y CSS Grid**
- La barra de controles usa `display: flex` con `flex-wrap: wrap` para adaptarse a distintos anchos de pantalla.
- La grilla de tarjetas usa `display: grid` con `repeat(auto-fill, minmax(150px, 1fr))` para ser responsive sin media queries.

**JavaScript: separación de responsabilidades**
La lógica está dividida en funciones con una única responsabilidad cada una:

| Función | Responsabilidad |
|---------|----------------|
| `generarHexAleatorio()` | Genera un color HEX aleatorio |
| `generarHSLAleatorio()` | Genera valores H, S, L aleatorios |
| `hslAString()` | Convierte objeto HSL a string CSS |
| `generarColor()` | Coordina la generación según el formato activo |
| `crearTarjeta()` | Construye un elemento DOM para cada color |
| `generarPaleta()` | Limpia y rellena el contenedor con nuevas tarjetas |
| `mostrarToast()` | Muestra y oculta la notificación de copiado |

**Estado de la app**
Dos variables globales (`cantidadColores` y `formatoActual`) actúan como estado de la aplicación. Se actualizan al hacer clic en los botones y son consultadas por `generarPaleta()` en cada ejecución.

**Generación de colores HSL**
Se restringen los rangos de saturación (30–90%) y luminosidad (30–70%) para evitar colores demasiado apagados o extremos (blanco/negro puro), garantizando resultados visualmente útiles.

---

## 💻 Ejecutar el proyecto en local

No requiere instalación de dependencias ni servidor. Solo necesitás un navegador web moderno.

### Opción A — Clonar con Git

```bash
# 1. Clonar el repositorio
git clone https://github.com/scarfcarob/ProyectoM1_CarolinaBetlienski.git

# 2. Entrar a la carpeta
cd ProyectoM1_CarolinaBetlienski

# 3. Abrir el archivo en el navegador
# En Mac:
open index.html

# En Windows:
start index.html

# En Linux:
xdg-open index.html
```

### Opción B — Descargar el ZIP

1. Ir a `https://github.com/scarfcarob/ProyectoM1_CarolinaBetlienski`
2. Hacer clic en el botón verde **"Code"**
3. Seleccionar **"Download ZIP"**
4. Descomprimir el archivo descargado
5. Abrir la carpeta y hacer doble clic en `index.html`

> **Nota:** Para que `navigator.clipboard` funcione correctamente al copiar colores, algunos navegadores requieren que el archivo se sirva desde un servidor local. Podés usar la extensión **Live Server** de VS Code o ejecutar `npx serve .` en la carpeta del proyecto.

---

## 🚀 Desplegar en GitHub Pages

GitHub Pages permite publicar sitios estáticos directamente desde un repositorio de GitHub, de forma gratuita.

### Pasos

**1. Asegurate de que el repositorio sea público**
Entrá a `Settings` del repositorio → en la sección `General` verificá que sea **Public**.

**2. Activar GitHub Pages**
1. En el repositorio, hacé clic en la pestaña **Settings**
2. En el menú lateral izquierdo, buscá la sección **Pages**
3. En **"Source"**, seleccioná **Deploy from a branch**
4. En **"Branch"**, elegí `main` y la carpeta `/ (root)`
5. Hacé clic en **Save**

**3. Esperar el deploy**
GitHub tarda entre 1 y 3 minutos en publicar el sitio. Podés ver el estado en la pestaña **Actions** del repositorio.

**4. Acceder al sitio publicado**
Una vez publicado, la URL del sitio será:

```
https://scarfcarob.github.io/ProyectoM1_CarolinaBetlienski/
```

### Actualizar el sitio desplegado

Cada vez que hagas un `push` a la rama `main`, GitHub Pages redesplegará el sitio automáticamente.

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

---

## 👩‍💻 Autora

**Carolina Betlienski S**
Proyecto — Módulo 1
© 2026
