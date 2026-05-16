/* ============================================= */
/* FUNCIONES AUXILIARES - SERVI                  */
/* ============================================= */

/**
 * Formatea un valor numérico como pesos argentinos.
 * Devuelve '$ 0' cuando el valor es cero.
 */
function formatearPesos(valor) {
    const numero = Number(valor) || 0;
    return '$ ' + numero.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/**
 * Formatea un número sin símbolo de moneda.
 */
function formatearNumero(valor) {
    return (Number(valor) || 0).toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/**
 * Convierte una fecha ISO (YYYY-MM-DD) a formato DD/MM/AAAA.
 */
function formatearFechaDDMMAAAA(fechaISO) {
    if (!fechaISO) return '';
    const [anio, mes, dia] = fechaISO.split('-');
    if (!dia) return fechaISO;
    return `${dia}/${mes}/${anio}`;
}

/**
 * Devuelve los elementos del DOM de resultados principales.
 */
function obtenerElementosDOM() {
    return {
        totalTitular:  document.getElementById('totalTitular'),
        totalChofer:   document.getElementById('totalChofer'),
        promedioViaje: document.getElementById('promedioViaje'),
        promedioKm:    document.getElementById('promedioKm')
    };
}

/**
 * Devuelve los elementos del DOM del desglose detallado del cálculo.
 */
function obtenerElementosDetalle() {
    return {
        detTotal:            document.getElementById('detTotal'),
        detCombustible:      document.getElementById('detCombustible'),
        detSubtotal1:        document.getElementById('detSubtotal1'),
        det50:               document.getElementById('det50'),
        detFrecuencia:       document.getElementById('detFrecuencia'),
        detSubtotal2:        document.getElementById('detSubtotal2'),
        detTarjeta:          document.getElementById('detTarjeta'),
        detVoucher:          document.getElementById('detVoucher'),
        detToken:            document.getElementById('detToken'),
        detCtaCte:           document.getElementById('detCtaCte'),
        detGastos:           document.getElementById('detGastos'),
        detTotalTitular:     document.getElementById('detTotalTitular'),
        detChoferBase:       document.getElementById('detChoferBase'),
        detChoferFrecuencia: document.getElementById('detChoferFrecuencia'),
        detTotalChofer:      document.getElementById('detTotalChofer'),
        detOperacion:        document.getElementById('detOperacion')
    };
}
