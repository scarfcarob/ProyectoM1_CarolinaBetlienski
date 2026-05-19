# 🎨 Generador de Paletas de Colores

**Proyecto M1 — Betlienski Carolina S**

Herramienta web estática e interactiva que genera paletas de colores aleatorias de forma rápida e intuitiva. Desarrollada con HTML, CSS y JavaScript vanilla, sin frameworks ni dependencias externas.

---

## 📖 Manual de Usuario

### ¿Cómo usar la app?

Al abrir la aplicación, se genera automáticamente una paleta de 6 colores aleatorios en formato HEX. No necesitás hacer nada para empezar — la app ya está lista para usar.

### Controles disponibles

#### 1. Generar una nueva paleta
Hacé clic en el botón azul **"Generar paleta"** para crear un conjunto completamente nuevo de colores aleatorios. Aparecerá una notificación verde confirmando la acción.

#### 2. Seleccionar el tamaño de la paleta
En la barra de controles, hacé clic en uno de los botones de tamaño:

| Botón | Resultado |
|-------|-----------|
| `6` | Muestra 6 tarjetas de color |
| `8` | Muestra 8 tarjetas de color |
| `9` | Muestra 9 tarjetas de color |

El botón activo se resalta en negro. Cambiar el tamaño no genera colores nuevos — solo muestra más o menos colores de la paleta actual.

#### 3. Seleccionar el formato de color
Elegí cómo querés ver los códigos de color:

| Botón | Formato | Ejemplo |
|-------|---------|---------|
| `HEX` | Hexadecimal | `#3AF92C` |
| `HSL` | Matiz, Saturación, Luminosidad | `hsl(210, 60%, 50%)` |

Cambiar el formato no genera colores nuevos — solo convierte la representación visual del mismo color.

#### 4. Copiar un color
Hacé clic sobre cualquier tarjeta de color para copiar su código al portapapeles. Aparecerá una notificación violeta confirmando el color copiado.

### Notificaciones

La app muestra tres tipos de notificaciones en pantalla:

| Color | Ícono | Cuándo aparece |
|-------|-------|----------------|
| Verde | ✅ | Al generar una nueva paleta |
| Azul | 📐 | Al cambiar el tamaño |
| Violeta | 📋 | Al copiar un color |

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
| CSS3 | — | Estilos, layout y animaciones |
| JavaScript ES6 | — | Lógica e interactividad |
| Normalize.css | 8.0.1 | Reset de estilos entre navegadores |

### Decisiones de diseño

**HTML semántico y accesibilidad**
Se utilizaron etiquetas semánticas (`<header>`, `<main>`, `<footer>`, `<section>`) y atributos de accesibilidad como `role="status"` en el toast y `class="sr-only"` en el `<h2>` de controles, para compatibilidad con lectores de pantalla.

**CSS con variables (Custom Properties)**
Los colores, radios de borde y fuentes se definen en `:root` como variables CSS, centralizando el sistema de diseño y facilitando futuros cambios de tema.

**Layout responsivo sin media queries**
- Barra de controles: `display: flex` con `flex-wrap: wrap` y `justify-content: space-between`
- Grilla de tarjetas: `display: grid` con `repeat(auto-fit, minmax(180px, 1fr))` — se adapta automáticamente a cualquier ancho de pantalla

**Sistema de color basado en HSL**
Todos los colores se generan internamente en formato HSL con rangos controlados:
- Saturación: 30–90% (evita colores apagados)
- Luminosidad: 30–70% (evita negro y blanco puros)

Luego se convierten a HEX mediante un algoritmo matemático (`hslAHex()`), lo que garantiza colores siempre visualmente útiles independientemente del formato mostrado.

**Separación entre datos y presentación**
La paleta se genera una sola vez (`generarNuevaPaleta()`) y se guarda en el array `paletaActual`. Los cambios de tamaño y formato solo llaman a `renderizarPaleta()`, que reutiliza los datos existentes sin regenerar colores — esto evita que la paleta cambie al solo cambiar el formato o el tamaño.

**JavaScript: separación de responsabilidades**

| Función | Responsabilidad |
|---------|----------------|
| `generarHSLAleatorio()` | Genera valores H, S, L aleatorios dentro de rangos controlados |
| `hslAHex()` | Convierte valores HSL a código HEX mediante algoritmo matemático |
| `formatearColor()` | Devuelve el color en el formato activo (HEX u HSL) |
| `crearTarjeta()` | Construye el elemento DOM completo de cada tarjeta |
| `renderizarPaleta()` | Lee `paletaActual` y dibuja las tarjetas en el DOM |
| `generarNuevaPaleta()` | Genera 9 colores nuevos, los guarda y llama a `renderizarPaleta()` |
| `mostrarToast()` | Muestra notificaciones tipadas con animación y auto-ocultado |

**Toast con tipos**
El sistema de notificaciones acepta tres tipos (`exito`, `info`, `copia`) que aplican estilos CSS diferentes mediante clases dinámicas. Se fuerza un reflow con `void toast.offsetWidth` para reiniciar la animación si el toast ya estaba visible.

---

## 💻 Ejecutar en local

No requiere instalación de dependencias ni servidor.

### Opción A — Clonar con Git

```bash
# 1. Clonar el repositorio
git clone https://github.com/scarfcarob/ProyectoM1_CarolinaBetlienski.git

# 2. Entrar a la carpeta
cd ProyectoM1_CarolinaBetlienski

# 3. Abrir en el navegador
# Mac:     open index.html
# Windows: start index.html
# Linux:   xdg-open index.html
```

### Opción B — Descargar el ZIP

1. Ir a `https://github.com/scarfcarob/ProyectoM1_CarolinaBetlienski`
2. Hacer clic en el botón verde **"Code"**
3. Seleccionar **"Download ZIP"**
4. Descomprimir y abrir `index.html` en el navegador

> **Recomendado:** Abrí el proyecto con la extensión **Live Server** de VS Code. Esto asegura que `navigator.clipboard` (la función de copiar) funcione correctamente, ya que algunos navegadores la bloquean cuando el archivo se abre directamente desde el disco.

---

## 🚀 Desplegar en GitHub Pages

GitHub Pages publica sitios estáticos de forma gratuita directamente desde el repositorio.

### Pasos

1. En tu repositorio, ir a la pestaña **Settings**
2. En el menú lateral, hacer clic en **Pages**
3. En **Source**, seleccionar **Deploy from a branch**
4. En **Branch**, elegir `main` y carpeta `/ (root)`
5. Hacer clic en **Save**
6. Esperar entre 1 y 3 minutos

El sitio quedará publicado en:

```
https://scarfcarob.github.io/ProyectoM1_CarolinaBetlienski/
```

### Actualizar el sitio después de cada cambio

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

GitHub Pages redespliega automáticamente con cada `push` a `main`.

---

## 👩‍💻 Autora

**Carolina Betlienski S**
Proyecto M1 — © 2026
