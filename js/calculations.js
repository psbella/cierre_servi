/* ============================================= */
/* LOGICA DE CALCULO - SERVI                     */
/* ============================================= */

/**
 * Suma todos los campos de combustible (principal + dinámicos).
 */
function obtenerTotalCombustible() {
    const principal = parseFloat(document.getElementById('combustiblePrincipal')?.value) || 0;
    const extras = [...document.querySelectorAll('#combustibleContainer input[type="text"]')]
        .reduce((acc, input) => acc + (parseFloat(input.value) || 0), 0);
    return principal + extras;
}

/**
 * Lee todos los campos del formulario y devuelve un objeto con los datos.
 */
function obtenerDatos() {
    const fechaInput = document.getElementById('fecha');
    const fechaISO = fechaInput?.value || new Date().toISOString().split('T')[0];

    return {
        fecha:           fechaISO,
        fechaFormateada: formatearFechaDDMMAAAA(fechaISO),
        licencia:        document.getElementById('licencia')?.value.trim() || '',
        chofer:          document.getElementById('choferNombre')?.value.trim() || '',
        viajes:          parseFloat(document.getElementById('viajes')?.value) || 0,
        kilometros:      parseFloat(document.getElementById('kilometros')?.value) || 0,
        totalReloj:      parseFloat(document.getElementById('totalReloj')?.value) || 0,
        relevo:          parseFloat(document.getElementById('relevo')?.value) || 0,
        combustible:     obtenerTotalCombustible(),
        frecuencia:      parseFloat(document.getElementById('frecuencia')?.value) || 0,
        tarjetaQr:       parseFloat(document.getElementById('tarjeta_qr')?.value) || 0,
        voucher:         parseFloat(document.getElementById('voucher')?.value) || 0,
        firmaTicket:     parseFloat(document.getElementById('firmaTicket')?.value) || 0,
        cuentaCorriente: parseFloat(document.getElementById('cuenta_corriente')?.value) || 0,
        gastos:          parseFloat(document.getElementById('gastos')?.value) || 0,
        notas:           document.getElementById('notas')?.value || ''
    };
}

/**
 * Ejecuta toda la lógica de negocio y devuelve los resultados.
 * Fórmula:
 *   totalRecaudacion = totalReloj - relevo
 *   subtotal         = totalRecaudacion - combustible
 *   base50           = subtotal / 2
 *   TITULAR          = base50 + frecuencia - (tarjetaQr + voucher + firmaTicket + cuentaCorriente + gastos)
 *   CHOFER           = base50 - frecuencia
 */
function calcularTodo() {
    const d = obtenerDatos();

    const totalRecaudacion = d.totalReloj - d.relevo;
    const subtotal         = totalRecaudacion - d.combustible;
    const base50           = subtotal / 2;
    const subTotal         = base50 + d.frecuencia;
    const descuentos       = d.tarjetaQr + d.voucher + d.firmaTicket + d.cuentaCorriente + d.gastos;
    const totalTitular     = subTotal - descuentos;
    const totalChofer      = base50 - d.frecuencia;
    const promedioViaje    = d.viajes > 0    ? totalRecaudacion / d.viajes    : 0;
    const promedioKm       = d.kilometros > 0 ? totalRecaudacion / d.kilometros : 0;

    return {
        ...d,
        totalRecaudacion,
        subtotal,
        base50,
        subTotal,
        descuentos,
        totalTitular,
        totalChofer,
        promedioViaje,
        promedioKm
    };
}
