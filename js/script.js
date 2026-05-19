

// ================================================
// Variables que guardan la configuración actual
// ================================================

let cantidadColores = 6;              // valores por defecto
let formatoActual = "hex";



let paletaActual = [];


// ============================================
// PARTE 1: GENERADORES Y CONVERSORES DE COLOR
// ============================================

function generarHSLAleatorio() {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 60) + 30;
    const l = Math.floor(Math.random() * 40) + 30;
    return { h, s, l };
}


function hslAHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}


function formatearColor(hsl) {
    if (formatoActual === "hsl") {
        const texto = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        return { css: texto, texto: texto };
    } else {
        const hex = hslAHex(hsl.h, hsl.s, hsl.l);
        return { css: hex, texto: hex };
    }
}


// ============================================
// PARTE 2: CREAR UNA TARJETA DE COLOR
// ============================================

function crearTarjeta(hsl) {
    const color = formatearColor(hsl);

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-color");
    tarjeta.setAttribute("role", "listitem");

    const swatch = document.createElement("div");
    swatch.classList.add("muestra-color");
    
    swatch.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    const infoContenedor = document.createElement("div");
    infoContenedor.classList.add("info-color");

    const textoColor = document.createElement("p");
    textoColor.classList.add("texto-hex");
    textoColor.textContent = color.texto;

    infoContenedor.appendChild(textoColor);
    tarjeta.appendChild(swatch);
    tarjeta.appendChild(infoContenedor);

    tarjeta.addEventListener("click", function () {
        navigator.clipboard.writeText(color.texto);
        mostrarToast("📋 Copiado: " + color.texto, "copia");
    });

    return tarjeta;
}


// ================================================
// PARTE 3: RENDERIZAR LA PALETA
// ================================================

function renderizarPaleta() {
    const contenedor = document.getElementById("paleta");
    contenedor.innerHTML = "";

    // muestra la cantidad de tarjetas según cantidadColores
    const coloresAMostrar = paletaActual.slice(0, cantidadColores);

    coloresAMostrar.forEach(function (hsl) {
        const tarjeta = crearTarjeta(hsl);
        contenedor.appendChild(tarjeta);
    });
}


// ================================================
// PARTE 4: GENERAR COLORES NUEVOS
// =================================================


function generarNuevaPaleta() {
    paletaActual = [];
    for (let i = 0; i < 9; i++) {
        paletaActual.push(generarHSLAleatorio());
    }
    renderizarPaleta();
}


// ===============================================
// PARTE 5: TOAST CON TIPOS
// ===============================================

function mostrarToast(mensaje, tipo = "info") {
    const toast = document.getElementById("toast");

    toast.classList.remove("toast-exito", "toast-info", "toast-copia", "visible");

    // Fuerza reflow para reiniciar la animación si el toast ya estaba visible
    void toast.offsetWidth;

    toast.textContent = mensaje;
    toast.classList.add("toast-" + tipo, "visible");

    setTimeout(function () {
        toast.classList.remove("visible");
    }, 2000);
}


// =================================================
// PARTE 6: EVENTOS
// =================================================


document.getElementById("btn-generar").addEventListener("click", function () {
    generarNuevaPaleta();
    mostrarToast("✅ ¡Paleta generada con éxito!", "exito");
});


// Botones de tamaño = solo cambia cuántas tarjetas se muestran
const botonesSize = document.querySelectorAll(".grupo-tamanio button");

// Al hacer click, actualiza cantidadColores, marca el botón como activo y renderiza la paleta
botonesSize.forEach(function (boton) {
    boton.addEventListener("click", function () {
        cantidadColores = parseInt(boton.dataset.size);
        botonesSize.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
        renderizarPaleta();
        mostrarToast("📐 Mostrando " + cantidadColores + " colores", "info");
    });
});


// Botones de formato = solo convierte el texto visible
const botonesFormato = document.querySelectorAll(".grupo-formato button");

botonesFormato.forEach(function (boton) {
    boton.addEventListener("click", function () {
        formatoActual = boton.dataset.formato;
        botonesFormato.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
        renderizarPaleta();
        mostrarToast("🎨 Formato cambiado a " + boton.textContent, "info");
    });
});


// ============================================
// INICIO
// ============================================

document.querySelector(".grupo-tamanio button").classList.add("activo");
document.querySelector(".grupo-formato button").classList.add("activo");

generarNuevaPaleta();