

// ============================================
// Variables de estado
// ============================================
let cantidadColores = 6;
let formatoActual = "hex"; 


// ============================================
// PARTE 1: GENERADOR DE COLOR HEX
// ============================================

function generarHexAleatorio() {
    const caracteres = '0123456789ABCDEF';
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        hex += caracteres[Math.floor(Math.random() * 16)];
    }
    return hex;
}

// generarColor() devuelve HEX

function generarColor() {
    const hex = generarHexAleatorio();
    return {
        css: hex,
        texto: hex
    };
}


// ============================================
// PARTE 2: CREAR UNA TARJETA DE COLOR
// ============================================

function crearTarjeta(color) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-color");
    tarjeta.setAttribute("role", "listitem");

    const swatch = document.createElement("div");
    swatch.classList.add("muestra-color");
    swatch.style.backgroundColor = color.css;

    const codigo = document.createElement("div");
    codigo.classList.add("info-color");

    const texto = document.createElement("p");
    texto.classList.add("texto-hex");
    texto.textContent = color.texto;

    codigo.appendChild(texto);
    tarjeta.appendChild(swatch);
    tarjeta.appendChild(codigo);

    tarjeta.addEventListener("click", function () {
        navigator.clipboard.writeText(color.texto);
        mostrarToast("Copiado: " + color.texto);
    });

    return tarjeta;
}


// ============================================
// PARTE 3: GENERAR LA PALETA
// ============================================

function generarPaleta() {
    const contenedor = document.getElementById("paleta");
    contenedor.innerHTML = "";

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

document.getElementById("btn-generar").addEventListener("click", generarPaleta);

// Botones de tamaño (6 / 8 / 9)
const botonesSize = document.querySelectorAll(".grupo-tamanio button");

botonesSize.forEach(function (boton) {
    boton.addEventListener("click", function () {
        cantidadColores = parseInt(boton.dataset.size);
        botonesSize.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
        generarPaleta();
    });
});

// Botón HEX — solo marca el activo, no cambia el formato porque ya es hex fijo
const botonesFormato = document.querySelectorAll(".grupo-formato button");

botonesFormato.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesFormato.forEach(function (b) { b.classList.remove("activo"); });
        boton.classList.add("activo");
    });
});


// ============================================
// INICIO
// ============================================

document.querySelector(".grupo-tamanio button").classList.add("activo");
document.querySelector(".grupo-formato button").classList.add("activo");

generarPaleta();


    
    
    
    
    
    
    
    
    
    
    
    
  






























