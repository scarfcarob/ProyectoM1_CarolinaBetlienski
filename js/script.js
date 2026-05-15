
// ============================================
// PARTE 1: GENERAR UN COLOR HEX ALEATORIO
// ============================================

function generarHexAleatorio() {
    const caracteres = '0123456789ABCDEF';
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        hex += caracteres[Math.floor(Math.random() * 16)];
    }
    return hex; 
}


// ============================================
// PARTE 2: CREAR UNA TARJETA DE COLOR
// ============================================

function crearTarjeta(colorHex) {
    // contenedor principal
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-color")
    
    // bloque visual de color
    const swatch = document.createElement("div");
    swatch.classList.add("muestra-color");
    swatch.style.backgroundColor = colorHex; 

    // texto con el código
    const info = document.createElement("div");
    info.classList.add("info-color");

    const texto = document.createElement("p");
    texto.classList.add("texto-hex");
    texto.textContent = colorHex; // muestra

    // armar la tarjeta
    info.appendChild(texto);
    tarjeta.appendChild(swatch);
    tarjeta.appendChild(info);

    return tarjeta;
}


// ============================================
// PARTE 3: GENERAR LA PALETA COMPLETA
// ============================================

function generarPaleta() {
    const contenedor = document.getElementById("paleta");
    contenedor.innerHTML = ""; // limpiar la paleta anterior

    for (let i = 0; i < 6; i++) {
        const colorHex = generarHexAleatorio();
        const tarjeta = crearTarjeta(colorHex);
        contenedor.appendChild(tarjeta);
    }
}


// ============================================
// PARTE 4: EVENTO DEL BOTÓN
// ============================================

document.getElementById("btn-generar").addEventListener("click", generarPaleta);

// generar la primera paleta al cargar la página
generarPaleta();


    
    
    
    
    
    
    
    
    
    
    
    
  






























