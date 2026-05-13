/* ============================================= */
/* LOGICA DE CALCULO                             */
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
        recaudacion: parseFloat(document.getElementById('recaudacion')?.value) || 0,
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
    
    // Paso 1: Recaudacion - Combustible
    const despuesCombustible = d.recaudacion - d.combustible;
    
    // Paso 2: Base 50%
    const base50 = despuesCombustible / 2;
    
    // Paso 3: Descuentos que afectan solo al TITULAR
    const descuentosTitular = d.tarjetaQr + d.voucher + d.firmaTicket + d.cuentaCorriente + d.gastos;
    
    // Paso 4: TOTAL TITULAR
    const totalTitular = base50 + d.frecuencia - descuentosTitular;
    
    // Paso 5: TOTAL CHOFER
    const totalChofer = base50 - d.frecuencia;
    
    // Promedios
    let promedioViaje = 0;
    let promedioKm = 0;
    if (d.viajes > 0) promedioViaje = d.recaudacion / d.viajes;
    if (d.kilometros > 0) promedioKm = d.recaudacion / d.kilometros;
    
    return {
        totalTitular,
        totalChofer,
        promedioViaje,
        promedioKm,
        base50,
        despuesCombustible,
        descuentosTitular,
        ...d
    };
}
