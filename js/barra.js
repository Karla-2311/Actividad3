/* 
   COMPONENTE.JS — Barra de progreso animada
   Genera una barra de progreso dentro de un contenedor, que se
   anima desde 0 hasta el porcentaje indicado. Sin frameworks.
*/

// Guarda referencia de cada barra creada para poder actualizarla después.
const _barras = {};

/*
 * Crea una barra de progreso animada dentro del contenedor indicado.
 */
function crearBarraProgreso(idContenedor, porcentaje, opciones = {}) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) {
    console.error(`crearBarraProgreso: no se encontró el contenedor #${idContenedor}`);
    return;
  }

  const etiqueta = opciones.etiqueta || '';
  const color = opciones.color || 'azul';
  const duracion = opciones.duracion || 1000;

  contenedor.classList.add('barra-progreso');
  contenedor.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'barra-progreso-header';

  const spanEtiqueta = document.createElement('span');
  spanEtiqueta.className = 'barra-progreso-etiqueta';
  spanEtiqueta.textContent = etiqueta;

  const spanValor = document.createElement('span');
  spanValor.className = 'barra-progreso-valor';
  spanValor.textContent = '0%';

  header.appendChild(spanEtiqueta);
  header.appendChild(spanValor);

  const track = document.createElement('div');
  track.className = 'barra-progreso-track';

  const fill = document.createElement('div');
  fill.className = `barra-progreso-fill barra-progreso-${color}`;
  fill.style.width = '0%';

  track.appendChild(fill);
  contenedor.appendChild(header);
  contenedor.appendChild(track);

  _barras[idContenedor] = { fill, spanValor, valorActual: 0 };

  _animarHasta(idContenedor, porcentaje, duracion);
}

/**
 * Actualiza una barra de progreso ya creada a un nuevo porcentaje,
 * animando desde su valor actual. Útil para reflejar progreso en vivo
 * (ej. una descarga, un formulario que se va completando, etc.)
 */
function actualizarBarraProgreso(idContenedor, nuevoPorcentaje, duracion = 800) {
  if (!_barras[idContenedor]) return;
  _animarHasta(idContenedor, nuevoPorcentaje, duracion);
}

function _animarHasta(idContenedor, porcentajeFinal, duracion) {
  const barra = _barras[idContenedor];
  if (!barra) return;

  const porcentaje = Math.max(0, Math.min(100, porcentajeFinal));
  const inicio = barra.valorActual;
  const inicioTiempo = performance.now();

  function paso(ahora) {
    const transcurrido = ahora - inicioTiempo;
    const progreso = Math.min(transcurrido / duracion, 1);
    const valor = Math.round(inicio + (porcentaje - inicio) * progreso);

    barra.fill.style.width = valor + '%';
    barra.spanValor.textContent = valor + '%';

    if (progreso < 1) {
      requestAnimationFrame(paso);
    } else {
      barra.valorActual = porcentaje;
    }
  }

  requestAnimationFrame(paso);
}