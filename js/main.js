/* ============================================= */
/* LOGICA PRINCIPAL - SERVI                      */
/* ============================================= */

// =============================================
// COMBUSTIBLE DINÁMICO
// =============================================

const combustiblePrincipal = document.getElementById('combustiblePrincipal');
const containerCombustible = document.getElementById('combustibleContainer');
const totalCombustibleDiv  = document.getElementById('totalCombustible');
let   inputsCombustible    = [];

function calcularTotalCombustible() {
    const principal = parseFloat(combustiblePrincipal?.value) || 0;
    const extras    = inputsCombustible.reduce((acc, inp) => acc + (parseFloat(inp.value) || 0), 0);
    const total     = principal + extras;
    if (totalCombustibleDiv) {
        totalCombustibleDiv.innerHTML = `<strong>Total combustible: ${formatearPesos(total)}</strong>`;
    }
}

function agregarCampoCombustible() {
    const index = inputsCombustible.length;

    const div = document.createElement('div');
    div.style.cssText = 'display:flex; gap:8px; margin-bottom:8px; align-items:center;';

    const input = document.createElement('input');
    input.type        = 'text';
    input.placeholder = `Carga ${index + 1}`;
    input.inputMode   = 'numeric';
    input.pattern     = '[0-9]*';
    input.style.cssText = 'flex:1; padding:8px 12px; border:1px solid #ccc; border-radius:8px;';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '✕';
    btnEliminar.type        = 'button';
    btnEliminar.style.cssText = 'width:
