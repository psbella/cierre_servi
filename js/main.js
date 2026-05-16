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
    btnEliminar.style.cssText = 'width:32px; background:#e74c3c; color:white; border:none; border-radius:8px; cursor:pointer;';

    btnEliminar.addEventListener('click', () => {
        const pos = inputsCombustible.indexOf(input);
        if (pos !== -1) inputsCombustible.splice(pos, 1);
        div.remove();
        inputsCombustible.forEach((inp, i) => { inp.placeholder = `Carga ${i + 1}`; });
        calcularTotalCombustible();
        actualizarPantalla();
    });

    input.addEventListener('input', () => {
        calcularTotalCombustible();
        actualizarPantalla();
    });

    div.appendChild(input);
    div.appendChild(btnEliminar);
    containerCombustible?.appendChild(div);
    inputsCombustible.push(input);
    calcularTotalCombustible();
}

document.getElementById('btnAgregarCombustible')?.addEventListener('click', agregarCampoCombustible);
combustiblePrincipal?.addEventListener('input', () => {
    calcularTotalCombustible();
    actualizarPantalla();
});

// =============================================
// ACTUALIZAR PANTALLA (CÁLCULOS)
// =============================================

function actualizarPantalla() {
    const r    = calcularTodo();
    const elem = obtenerElementosDOM();

    if (elem.totalTitular)  elem.totalTitular.textContent  = formatearPesos(r.totalTitular);
    if (elem.totalChofer)   elem.totalChofer.textContent   = formatearPesos(r.totalChofer);
    if (elem.promedioViaje) elem.promedioViaje.textContent = formatearPesos(r.promedioViaje);
    if (elem.promedioKm)    elem.promedioKm.textContent    = formatearPesos(r.promedioKm);
}

// =============================================
// BOTONES PRINCIPALES
// =============================================

document.getElementById('exportarPDF')?.addEventListener('click', exportarPDF);
document.getElementById('enviarWhatsapp')?.addEventListener('click', enviarWhatsapp);
document.getElementById('enviarEmail')?.addEventListener('click', enviarEmail);

// =============================================
// NAVEGACIÓN CON ENTER
// =============================================

function setupEnterNavigation() {
    const campos = [...document.querySelectorAll('input, textarea')];
    campos.forEach((campo, index) => {
        campo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && campo.tagName !== 'TEXTAREA') {
                e.preventDefault();
                campos[index + 1]?.focus();
                campos[index + 1]?.select?.();
            }
        });
    });
}

// =============================================
// INICIALIZAR
// =============================================

const fechaInput = document.getElementById('fecha');
if (fechaInput) fechaInput.value = '';

document.querySelectorAll('input:not(#combustiblePrincipal), textarea').forEach(campo => {
    campo.addEventListener('input', actualizarPantalla);
});

setupEnterNavigation();
calcularTotalCombustible();
actualizarPantalla();
