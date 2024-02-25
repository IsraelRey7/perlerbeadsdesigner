//. VARIABLES GLOBALES
let currentBeadSize = 'MIDI'; // Por defecto
let currentPegboardType = 'Square'; // Por defecto
let beads = [];
let currentColor = 'black'; // Color por defecto
let selectedColor = 'black'; // Color seleccionado actualmente, inicializado a negro
let isColorPaletteVisible = false; // Variable para controlar el estado de visibilidad
let ctx;
const gridSize = 29;
const mmToPixels = 3.535;
const cellSize = 5 * mmToPixels;
const canvasSize = gridSize * cellSize;
canvas.width = canvasSize;
canvas.height = canvasSize;
const colorButton = document.getElementById('colorButton');
const colorPalette = document.getElementById('colorPalette');
//+ Listado de Colores Oficiales
const colors = [
  { name: 'Blanco', hex: '#FFFFFF' },
  { name: 'Crema', hex: '#FFEFBD' },
  { name: 'Amarillo', hex: '#FFC500' },
  { name: 'Naranja', hex: '#E45214' },
  { name: 'Rojo', hex: '#C22B2A' },
  { name: 'Rosa', hex: '#FF8EA4' },
  { name: 'Púrpura', hex: '#693D9F' },
  { name: 'Azul', hex: '#004584' },
  { name: 'Azul Claro', hex: '#007EBE' },
  { name: 'Verde', hex: '#0F8A49' },
  { name: 'Verde Claro', hex: '#5CCF97' },
  { name: 'Marrón', hex: '#402420' },
  { name: 'Rojo Translúcido', hex: '#E0464C' },
  { name: 'Amarillo Translúcido', hex: '#E4C000' },
  { name: 'Azul Translúcido', hex: '#008DC9' },
  { name: 'Verde Translúcido', hex: '#87DDAD' },
  { name: 'Gris', hex: '#8E9397' },
  { name: 'Negro', hex: '#000000' },
  { name: 'Transparente', hex: '#E5EBF4' },
  { name: 'Marrón Rojizo', hex: '#8B391E' },
  { name: 'Marrón Claro', hex: '#C0642E' },
  { name: 'Rojo Oscuro', hex: '#B31B29' },
  { name: 'Negro Translúcido', hex: '#767879' },
  { name: 'Púrpura Translúcido', hex: '#8D6DB4' },
  { name: 'Marrón Translúcido', hex: '#9D714E' },
  { name: 'Carne', hex: '#EDB69F' },
  { name: 'Beige', hex: '#EFBE92' },
  { name: 'Verde Oscuro', hex: '#182C1D' },
  { name: 'Burdeos', hex: '#CA1146' },
  { name: 'Borgoña', hex: '#5A0B15' },
  { name: 'Turquesa', hex: '#67A9BF' },
  { name: 'Fucsia Neón', hex: '#FF0090' },
  { name: 'Cereza Fluorescente', hex: '#FF4200' },
  { name: 'Amarillo Neón', hex: '#F6FF00' },
  { name: 'Rojo Neón', hex: '#FF1400' },
  { name: 'Azul Neón', hex: '#0016EE' },
  { name: 'Verde Neón', hex: '#79E633' },
  { name: 'Naranja Neón', hex: '#FF8D31' },
  { name: 'Amarillo Fluorescente', hex: '#F2F45F' },
  { name: 'Naranja Fluorescente', hex: '#FF6224' },
  { name: 'Azul Fluorescente', hex: '#005DA3' },
  { name: 'Verde Fluorescente', hex: '#57BE00' },
  { name: 'Amarillo Pastel', hex: '#FFFD70' },
  { name: 'Rojo Pastel', hex: '#FF7675' },
  { name: 'Púrpura Pastel', hex: '#A886C3' },
  { name: 'Azul Pastel', hex: '#8BC7EB' },
  { name: 'Verde Pastel', hex: '#BCF25E' },
  { name: 'Rosa Pastel', hex: '#E991C9' },
  { name: 'Azur', hex: '#5ABDCE' },
  { name: 'Verde Brillante', hex: '#E6F0D6' },
  { name: 'Rojo Brillante', hex: '#F3DAD6' },
  { name: 'Azul Brillante', hex: '#D4D7D9' },
  { name: 'Marrón Oso de Peluche', hex: '#F1A125' },
  { name: 'Dorado', hex: '#EAB732' },
  { name: 'Plateado', hex: '#A19E9E' },
  { name: 'Bronce', hex: '#8F7224' },
  { name: 'Perla', hex: '#E7DEDA' }
]
//+Listado de Tipos de Pegboard
const pegboards = [
  {name: "Placa MINI Cuadrada 56x56", x: 0, y: 0, beadSize: 'MINI', pegboardShape: 'Square', size: 56, assembleable: true},
  {name: "Placa MINI Cuadrada 28x28", x: 0, y: 0, beadSize: 'MINI', pegboardShape: 'Square', size: 28, assembleable: true},
  {name: "Placa MIDI Cuadrada 29x29", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Square', size: 29, assembleable: true},
  {name: "Placa MIDI Cuadrada 14x14", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Square', size: 14, assembleable: false},
  {name: "Placa MAXI Cuadrada 16x16", x: 0, y: 0, beadSize: 'MAXI', pegboardShape: 'Square', size: 16, assembleable: false},
  {name: "Placa MAXI Cuadrada 10x10", x: 0, y: 0, beadSize: 'MAXI', pegboardShape: 'Square', size: 10, assembleable: true},
  {name: "Placa MINI Cuadrada 8x8", x: 0, y: 0, beadSize: 'MAXI', pegboardShape: 'Square', size: 8, assembleable: true},
  {name: "Placa MINI Redonda ø=29", x: 0, y: 0, beadSize: 'MINI', pegboardShape: 'Circular', size: 29, assembleable: false},
  {name: "Placa MIDI Redonda ø=29", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Circular', size: 29, assembleable: false},
  {name: "Placa MIDI Redonda ø=23", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Circular', size: 23, assembleable: false},
  {name: "Placa MIDI Redonda ø=15", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Circular', size: 15, assembleable: false},
  {name: "Placa MINI Hexagonal 16", x: 0, y: 0, beadSize: 'MINI', pegboardShape: 'Hexagonal', size: 16, assembleable: false},
  {name: "Placa MIDI Hexagonal 16", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Hexagonal', size: 16, assembleable: false},
  {name: "Placa MIDI Hexagonal 13", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Hexagonal', size: 13, assembleable: true},
  {name: "Placa MIDI Hexagonal 8", x: 0, y: 0, beadSize: 'MIDI', pegboardShape: 'Hexagonal', size: 8, assembleable: false}
];

//. Forma de los pegboard
function drawPin(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
}
function drawSquarePegboard(ctx, x, y, size) {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const pinX = x + col * (5 * 3.535) + (5 * 3.535) / 2;
      const pinY = y + row * (5 * 3.535) + (5 * 3.535) / 2;
      drawPin(ctx, pinX, pinY, (5 * 3.535) / 10);
    }
  }
}
function drawCircularPegboard(ctx, x, y, diameter) {
  const radius = diameter / 2; // Calcula el radio basado en el diámetro
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2); // Dibuja el círculo
  ctx.stroke();
}
function drawHexagonalPegboard(ctx, centerX, centerY, sideLength) {
  // Calcula la altura de un hexágono perfecto
  let hexHeight = Math.sqrt(3) * sideLength;
  // Calcula el número de filas y el inicio de y basado en el centroY y hexHeight
  let rows = Math.ceil(hexHeight / (cellSize * 3/4));
  let startY = centerY - (rows * cellSize * 3/4) / 2;

  for (let row = 0; row < rows; row++) {
      let cols = calculateHexRowLength(row, sideLength, rows);
      // El inicio de x se ajusta para centrar las columnas de cada fila
      let startX = centerX - (cols * cellSize) / 2;
      for (let col = 0; col < cols; col++) {
          // Calcula las coordenadas de cada pin dentro del hexágono
          const pinX = startX + col * cellSize + cellSize / 2;
          const pinY = startY + row * cellSize * 3/4;
          drawPin(ctx, pinX, pinY, cellSize / 10);
      }
  }
}
function calculateHexRowLength(row, sideLength, totalRows) {
  // Calcula la longitud de cada fila dentro del hexágono
  let middleRow = Math.floor(totalRows / 2);
  if (row < middleRow) {
      return sideLength + 2 * row;
  } else {
      return sideLength + 2 * (totalRows - row - 1);
  }
}

//. Tipo de Pegboard
function updatePegboardSizeOptions(ctx) {
    const sizeSelect = document.getElementById('pegboardSizeSelect'); // Asumiendo que tienes un <select> con este ID
    sizeSelect.innerHTML = ''; // Limpia las opciones existentes

    const filteredPegboards = pegboards.filter(pb => pb.beadSize === currentBeadSize && pb.pegboardShape === currentPegboardType);

    filteredPegboards.forEach(pb => {
        const option = document.createElement('option');
        option.value = pb.name;
        option.textContent = pb.name;
        sizeSelect.appendChild(option);
    });

    // Selecciona por defecto la "Placa MIDI Cuadrada 29x29" si está disponible
    const defaultOption = filteredPegboards.find(pb => pb.name === "Placa MIDI Cuadrada 29x29");
    if (defaultOption) sizeSelect.value = "Placa MIDI Cuadrada 29x29";

    // Dibuja la placa por defecto
    drawSelectedPegboard(ctx);
}
function drawSelectedPegboard(ctx) {
  const selectedPegboardName = document.getElementById('pegboardSizeSelect').value;
  const pegboard = pegboards.find(pb => pb.name === selectedPegboardName);

  ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height); // Limpia el canvas antes de dibujar

  if (pegboard) {
      switch(pegboard.pegboardShape) {
          case 'Square':
              drawSquarePegboard(ctx, pegboard.x, pegboard.y, pegboard.size);
              break;
          case 'Circular':
              drawCircularPegboard(ctx, pegboard.x, pegboard.y, pegboard.size);
              break;
          case 'Hexagonal':
              drawHexagonalPegboard(ctx, pegboard.x, pegboard.y, pegboard.size);
              break;
      }
  }
}

//. pegboardPlatform
function drawPegboardPlatform(ctx, pegboards) {
  pegboards.forEach(pegboard => {
    switch(pegboard.pegboardShape) {
        case 'Square':
            drawSquarePegboard(ctx, pegboard.x, pegboard.y, pegboard.size);
            break;
        case 'Circular':
            drawCircularPegboard(ctx, pegboard.x, pegboard.y, pegboard.size);
            break;
        case 'Hexagonal':
            drawHexagonalPegboard(ctx, pegboard.x, pegboard.y, pegboard.size);
            break;
    }
});
}

//. DOM
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('screenCanvas');
  if (!canvas) {
    console.error('Canvas no encontrado');
    return;
  }
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Llama aquí a las funciones de dibujo inicial
  updatePegboardSizeOptions(ctx); // Asegúrate de que esta función y otras usen 'ctx' correctamente
});

function handleBeadTypeSelection(e) {
  if (e.target.tagName === 'BUTTON') {
    currentBeadSize = e.target.dataset.beadSize;
    updatePegboardSizeOptions();
  }
}

function handlePegboardTypeSelection(e) {
  if (e.target.tagName === 'BUTTON') {
    currentPegboardType = e.target.dataset.pegboardType;
    updatePegboardSizeOptions();
  }
}

function updatePegboardSizeOptions() {
  const sizeSelect = document.getElementById('pegboardSizeSelect');
  sizeSelect.innerHTML = ''; // Limpia las opciones existentes

  // Filtra las placas que coinciden con el tamaño de bead y el tipo de placa seleccionados
  const filteredPegboards = pegboards.filter(pb => pb.beadSize === currentBeadSize && pb.pegboardShape === currentPegboardType);

  // Rellena el select con las nuevas opciones
  filteredPegboards.forEach(pb => {
      const option = document.createElement('option');
      option.value = pb.name;
      option.textContent = pb.name;
      sizeSelect.appendChild(option);
  });

  // Selecciona por defecto la "Placa MIDI Cuadrada 29x29" si está disponible
  if (filteredPegboards.some(pb => pb.name === "Placa MIDI Cuadrada 29x29")) {
      sizeSelect.value = "Placa MIDI Cuadrada 29x29";
  } else if (filteredPegboards.length > 0) {
      // Si no está la placa por defecto, selecciona la primera disponible
      sizeSelect.value = filteredPegboards[0].name;
  }

  // Llama a drawSelectedPegboard para dibujar la placa seleccionada
  drawSelectedPegboard();
}

//. drawBead 
function drawBead(x, y, color) {
  ctx.strokeStyle = color; // Usa el color del bead proporcionado
  ctx.lineWidth = 5.5; // Grosor de la línea para la circunferencia
  const radio = cellSize / 2 - ctx.lineWidth / 2; // Ajustar el radio
  ctx.beginPath();
  ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, radio, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "transparent"; // Color del hueco del BEAD
  // Dibuja la circunferencia exterior del bead
  ctx.strokeStyle = "#CCCCCC"; // Usa el color del borde
  ctx.lineWidth = 0.5; // Grosor de la línea para la circunferencia
  const radius = cellSize / 2 - ctx.lineWidth / 2; // Ajustar el radio
  ctx.beginPath();
  ctx.arc(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "#F0F0F0"; // Color del hueco del BEAD
  // Dibuja la circunferencia interior del bead
}

//. COLOR
function getTextColorForBackground(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#333333' : '#FFFFFF';
}

function colorPalette1() {
  colors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('colorOption');
    colorDiv.style.backgroundColor = color.hex;
    colorDiv.style.color = getTextColorForBackground(color.hex);
    colorDiv.textContent = color.name;
    colorDiv.onclick = () => selectColor(color.hex);
    colorPalette1.appendChild(colorDiv);
  });
}

colorButton.onclick = () => {
  // Cambia el estado de visibilidad del colorPalette
  isColorPaletteVisible = !isColorPaletteVisible;
  colorPalette.style.display = isColorPaletteVisible ? 'block' : 'none';
  colorPalette.style.top = `${colorButton.offsetTop + colorButton.offsetHeight}px`;
  colorPalette.style.left = `${colorButton.offsetLeft}px`;
};
colorPalette1();
//* Add event listener to collapse the dropdown when clicking outside of it
document.addEventListener('click', (event) => {
  const target = event.target;
  const isColorPaletteClicked = colorPalette.contains(target);
  const isColorButtonClicked = colorButton.contains(target);

  if (!isColorPaletteClicked && !isColorButtonClicked && isColorPaletteVisible) {
    colorPalette.style.display = 'none';
    isColorPaletteVisible = false;
  }
});
//* Cuando se selecciona un nuevo color, actualiza la variable selectedColor
function selectColor(newColor) {
  selectedColor = newColor; // Actualiza el color seleccionado
  colorButton.style.backgroundColor = newColor; // Actualiza el color de fondo del botón

  // Encuentra el nombre del color basado en el hex y actualiza el texto del botón
  const colorName = colors.find(color => color.hex === newColor).name;
  colorButton.textContent = colorName; // Actualiza el texto del botón con el nombre del color

  colorButton.style.color = getTextColorForBackground(newColor); // Actualiza el color del texto para contraste
  colorPalette.style.display = 'none'; // Oculta la paleta de colores
}

function getCellCoordinates(x, y) {
    return {
        x: Math.floor(x / cellSize),
        y: Math.floor(y / cellSize)
    };
}

const cleanCanvas = document.getElementById('cleanCanvas');

//. Limpiar Canvas
function clearBeads() {
  // Confirmación antes de borrar
  const confirmClear = window.confirm('¿Seguro que quieres borrar todos los Beads?');
  if (confirmClear) {
    beads = []; // Restablece el array de beads solo si el usuario confirma
    drawPegboardPlatform(); // Redibuja la pegboardPlatform en blanco
  }
}
cleanCanvas.addEventListener('click', clearBeads);

//. Clics con el Ratón
canvas.addEventListener('contextmenu', e => e.preventDefault()); // Previene el menú contextual del botón derecho
canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const { x: cellX, y: cellY } = getCellCoordinates(x, y);

  // Seleccionar color actual
  const color = selectedColor;

  if (e.button === 0) { // Botón izquierdo para pintar
    // Comprueba si el bead ya está pintado en esta celda
    const existingBeadIndex = beads.findIndex(bead => bead.x === cellX && bead.y === cellY);
    if (existingBeadIndex === -1) { // Si no está pintado, añade un nuevo bead
      beads.push({ x: cellX, y: cellY, color });
    } else { // Si ya está pintado, cambia el color
      beads[existingBeadIndex].color = color;
    }
  } else if (e.button === 2) { // Botón derecho para borrar beads
    // Encuentra el bead en la posición del cursor y lo elimina
    const beadIndex = beads.findIndex(bead => bead.x === cellX && bead.y === cellY);
    if (beadIndex !== -1) {
      beads.splice(beadIndex, 1);
    }
  }

  // Redibuja todo
  drawPegboardPlatform();
});

const exportPattern = document.getElementById('exportPattern');
exportPattern.addEventListener('click', exportarImagen);

//. Exportar Imagen
function exportarImagen() {
    const canvas = document.getElementById('screenCanvas');
    const context = canvas.getContext('2d');
  
    // Crear un nuevo canvas temporal
    const tempCanvas = document.createElement('canvas');
    const tCtx = tempCanvas.getContext('2d');
  
    // Establecer dimensiones al nuevo canvas
    tempCanvas.width = 512;
    tempCanvas.height = 512;
  
    // Pintar el fondo de blanco
    tCtx.fillStyle = '#F0F0F0';
    tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  
    // Dibujar el canvas original sobre el fondo blanco
    tCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
  
    // Exportar el canvas temporal como PNG
    const dataURL = tempCanvas.toDataURL('image/png');
  
    // Crear un elemento <a> para descargar la imagen
    const link = document.createElement('a');
    link.download = 'exported_image.png';
    link.href = dataURL;
    link.click();
}

//. Exportar/Importar Patrón
document.getElementById('exportPattern').addEventListener('click', exportarPatron);
document.getElementById('importPatternButton').addEventListener('click', importarPatron);
//* Exportar el patrón actual como JSON
function exportarPatron() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(beads));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "patron_beads.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
//* Importar un patrón desde un archivo JSON
function importarPatron() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = readerEvent => {
      const content = readerEvent.target.result;
      try {
        beads = JSON.parse(content);
        drawPegboardPlatform(); // Redibuja la pegboardPlatform con el nuevo patrón
      } catch (error) {
        console.error('Error al importar el patrón:', error);
      }
    }
    reader.readAsText(file);
  }
  input.click(); // Simula clic para abrir el diálogo de selección de archivo
}
