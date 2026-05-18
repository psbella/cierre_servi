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
    const r      = calcularTodo();
    const elem   = obtenerElementosDOM();
    const detalle = obtenerElementosDetalle();

    // Resultados principales
    if (elem.totalTitular)  elem.totalTitular.textContent  = formatearPesos(r.totalTitular);
    if (elem.totalChofer)   elem.totalChofer.textContent   = formatearPesos(r.totalChofer);
    if (elem.promedioViaje) elem.promedioViaje.textContent = formatearPesos(r.promedioViaje);
    if (elem.promedioKm)    elem.promedioKm.textContent    = formatearPesos(r.promedioKm);

    // Desglose titular
    if (detalle.detTotal)        detalle.detTotal.textContent        = formatearPesos(r.totalRecaudacion);
    if (detalle.detCombustible)  detalle.detCombustible.textContent  = formatearPesos(r.combustible);
    if (detalle.detSubtotal1)    detalle.detSubtotal1.textContent    = formatearPesos(r.subtotal);
    if (detalle.det50)           detalle.det50.textContent           = formatearPesos(r.base50);
    if (detalle.detFrecuencia)   detalle.detFrecuencia.textContent   = formatearPesos(r.frecuencia);
    if (detalle.detSubtotal2)    detalle.detSubtotal2.textContent    = formatearPesos(r.subTotal);
    if (detalle.detTarjeta)      detalle.detTarjeta.textContent      = formatearPesos(r.tarjetaQr);
    if (detalle.detVoucher)      detalle.detVoucher.textContent      = formatearPesos(r.voucher);
    if (detalle.detToken)        detalle.detToken.textContent        = formatearPesos(r.firmaTicket);
    if (detalle.detCtaCte)       detalle.detCtaCte.textContent       = formatearPesos(r.cuentaCorriente);
    if (detalle.detGastos)       detalle.detGastos.textContent       = formatearPesos(r.gastos);
    if (detalle.detTotalTitular) detalle.detTotalTitular.textContent = formatearPesos(r.totalTitular);

    // Desglose chofer
    if (detalle.detChoferBase)       detalle.detChoferBase.textContent       = formatearPesos(r.base50);
    if (detalle.detChoferFrecuencia) detalle.detChoferFrecuencia.textContent = formatearPesos(r.frecuencia);
    if (detalle.detTotalChofer)      detalle.detTotalChofer.textContent      = formatearPesos(r.totalChofer);

    // Línea de operación completa
    if (detalle.detOperacion) {
        detalle.detOperacion.innerHTML =
            `TITULAR: Total Reloj ${formatearPesos(r.totalReloj)} - Relevo ${formatearPesos(r.relevo)} = ${formatearPesos(r.totalRecaudacion)} - Combustible ${formatearPesos(r.combustible)} = ${formatearPesos(r.subtotal)} / 2 = ${formatearPesos(r.base50)} + Frecuencia ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.subTotal)} - (Tarjeta/QR ${formatearPesos(r.tarjetaQr)} + Voucher ${formatearPesos(r.voucher)} + Firma Ticket ${formatearPesos(r.firmaTicket)} + Cta Cte ${formatearPesos(r.cuentaCorriente)} + Gastos ${formatearPesos(r.gastos)}) = ${formatearPesos(r.totalTitular)}<br><br>CHOFER: ${formatearPesos(r.base50)} - Frecuencia ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.totalChofer)}`;
    }
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
