/* ============================================= */
/* LOGICA DE CALCULO - SERVI v2                  */
/* ============================================= */

function obtenerDatos() {
    // Obtener fecha actual por defecto si el campo está vacío
    const fechaInput = document.getElementById('fecha');
    const fechaValue = fechaInput ? fechaInput.value : '';
    const fechaActual = fechaValue || new Date().toISOString().split('T')[0];
    
    return {
        fecha: fechaActual,
        fechaFormateada: formatearFechaDDMMAAAA(fechaActual),
        licencia: document.getElementById('licencia')?.value || '',
        chofer: document.getElementById('choferNombre')?.value || '',
        viajes: parseFloat(document.getElementById('viajes')?.value) || 0,
        kilometros: parseFloat(document.getElementById('kilometros')?.value) || 0,
        totalReloj: parseFloat(document.getElementById('totalReloj')?.value) || 0,
        relevo: parseFloat(document.getElementById('relevo')?.value) || 0,
        combustible: parseFloat(document.getElementById('combustible')?.value) || 0,
        frecuencia: parseFloat(document.getElementById('frecuencia')?.value) || 0,
        tarjetaQr: parseFloat(document.getElementById('tarjeta_qr')?.value) || 0,
        voucher: parseFloat(document.getElementById('voucher')?.value) || 0,
        firmaTicket: parseFloat(document.getElementById('firmaTicket')?.value) || 0,
        cuentaCorriente: parseFloat(document.getElementById('cuenta_corriente')?.value) || 0,
        gastos: parseFloat(document.getElementById('gastos')?.value) || 0,
        notas: document.getElementById('notas')?.value || ''
    };
}

function calcularTodo() {
    const d = obtenerDatos();
    
    // Total Reloj - Relevo = Total recaudación
    const totalRecaudacion = d.totalReloj - d.relevo;
    
    // Total recaudación - Combustible = Subtotal
    const subtotal = totalRecaudacion - d.combustible;
    
    // Subtotal / 2 = Base 50%
    const base50 = subtotal / 2;
    
    // Base 50% + Frecuencia = Sub total
    const subTotal = base50 + d.frecuencia;
    
    // Descuentos del titular
    const descuentos = d.tarjetaQr + d.voucher + d.firmaTicket + d.cuentaCorriente + d.gastos;
    
    // TOTAL TITULAR
    const totalTitular = subTotal - descuentos;
    
    // TOTAL CHOFER
    const totalChofer = base50 - d.frecuencia;
    
    // Promedios (usando totalRecaudacion como base)
    let promedioViaje = 0;
    let promedioKm = 0;
    if (d.viajes > 0) promedioViaje = totalRecaudacion / d.viajes;
    if (d.kilometros > 0) promedioKm = totalRecaudacion / d.kilometros;
    
    return {
        totalTitular,
        totalChofer,
        promedioViaje,
        promedioKm,
        totalRecaudacion,
        subtotal,
        base50,
        subTotal,
        descuentos,
        ...d
    };
}
