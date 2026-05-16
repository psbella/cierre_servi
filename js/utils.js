/* ============================================= */
/* FUNCIONES AUXILIARES - SERVI                  */
/* ============================================= */

/**
 * Formatea un valor numérico como pesos argentinos.
 * Devuelve '$ 0' cuando el valor es cero (antes retornaba cadena vacía,
 * lo que causaba que los totales aparecieran en blanco al iniciar).
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
 * Se eliminaron referencias a elementos de detalle que no existen en el HTML.
 */
function obtenerElementosDOM() {
    return {
        totalTitular:  document.getElementById('totalTitular'),
        totalChofer:   document.getElementById('totalChofer'),
        promedioViaje: document.getElementById('promedioViaje'),
        promedioKm:    document.getElementById('promedioKm')
    };
}
