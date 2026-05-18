

// ============================================
// Variables que guardan la configuracion actual 
// ============================================

let cantidadColores = 6;       // valores por defecto
let formatoActual = "hex";


// ============================================
// PARTE 1: GENERADORES DE COLOR
// ============================================


// Genera una color en formato Hexadecimal aleatorio
function generarHexAleatorio() {
    const caracteres = '0123456789ABCDEF';
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        hex += caracteres[Math.floor(Math.random() * 16)];
    }
    return hex;
}




// Genera un color en formato HSL aleatorio
function generarHSLAleatorio() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 60) + 30;
    const l = Math.floor(Math.random() * 40) + 30;
    return { h, s, l };
}



// Convierte un objeto HSL a un string CSS que se usa como color
function hslAString(hsl) {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}



// Genera un color en el formato actual (Hex o HSL)
// Devuelve un objeto con la propiedad 'css' para usar en estilos y 'texto' para mostrar/copiado

function generarColor() {
    if (formatoActual === "hsl") {
        const hsl = generarHSLAleatorio();
        return { css: hslAString(hsl), texto: hslAString(hsl) };
    } else {
        const hex = generarHexAleatorio();
        return { css: hex, texto: hex };
    }
}


// ============================================
// PARTE 2: CREAR UNA TARJETA DE COLOR
// ============================================

function crearTarjeta(color) {
    
    // contenedor principal de la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-color");
    tarjeta.setAttribute("role", "listitem");

    // bloque visual del color
    const swatch = document.createElement("div");
    swatch.classList.add("muestra-color");
    swatch.style.backgroundColor = color.css;

    // contenedor de la info (texto con el codigo del color)
    const infoContenedor = document.createElement("div");
    infoContenedor.classList.add("info-color");

    
    const textoColor = document.createElement("p");
    textoColor.classList.add("texto-hex");
    textoColor.textContent = color.texto;

    
    // armar la tarjeta juntando el bloque de color y la info
    infoContenedor.appendChild(textoColor);
    tarjeta.appendChild(swatch);
    tarjeta.appendChild(infoContenedor);

    // al hacer click en la tarjeta, copiar el codigo del color al portapapeles
    tarjeta.addEventListener("click", function () {
        navigator.clipboard.writeText(color.texto);
        mostrarToast("Copiado: " + color.texto);
    });

    return tarjeta;
}


// ============================================
// PARTE 3: GENERAR LA PALETA COMPLETA
// ============================================

function generarPaleta() {
    const contenedor = document.getElementById("paleta");
    contenedor.innerHTML = "";     // limpia la paleta antes de generar los nuevos colores

    for (let i = 0; i < cantidadColores; i++) {
        const color = generarColor();
        const tarjeta = crearTarjeta(color);
        contenedor.appendChild(tarjeta);
    }
}


// ============================================
// PARTE 4: TOAST
// ============================================

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("visible");

    setTimeout(function () {
        toast.classList.remove("visible");
    }, 2000);
}


// ============================================
// PARTE 5: EVENTOS
// ============================================


// Boton para generar una nueva paleta 
document.getElementById("btn-generar").addEventListener("click", generarPaleta);

// Botones para seleccionar la cantidad de colores (tamaño 6, 8, 9)
const botonesSize = document.querySelectorAll(".grupo-tamanio button");

botonesSize.forEach(function (boton) {
    boton.addEventListener("click", function () {
        cantidadColores = parseInt(boton.dataset.size);
        botonesSize.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
        generarPaleta();
    });
});


// Botones para seleccionar el formato de color (Hex o HSL)
const botonesFormato = document.querySelectorAll(".grupo-formato button");
botonesFormato.forEach(function (boton) {
    boton.addEventListener("click", function () {
        formatoActual = boton.dataset.formato;
        botonesFormato.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
        generarPaleta();
    });
});


// ============================================
// INICIO
// ============================================

document.querySelector(".grupo-tamanio button").classList.add("activo");
document.querySelector(".grupo-formato button").classList.add("activo");

generarPaleta();













