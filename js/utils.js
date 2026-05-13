/* ============================================= */
/* FUNCIONES AUXILIARES                          */
/* ============================================= */

function formatearPesos(valor) {
    if (valor === 0 || valor === null || valor === undefined || valor === '') return '';
    return '$ ' + valor.toLocaleString('es-AR', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    });
}

function formatearNumero(valor) {
    return valor.toLocaleString('es-AR', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    });
}

function formatearFechaDDMMAAAA(fechaISO) {
    if (!fechaISO) return '';
    const partes = fechaISO.split('-');
    if (partes.length !== 3) return fechaISO;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function obtenerElementosDOM() {
    return {
        totalTitular: document.getElementById('totalTitular'),
        totalChofer: document.getElementById('totalChofer'),
        promedioViaje: document.getElementById('promedioViaje'),
        promedioKm: document.getElementById('promedioKm')
    };
}

function obtenerElementosDetalle() {
    return {
        detTotal: document.getElementById('detTotal'),
        detCombustible: document.getElementById('detCombustible'),
        detSubtotal1: document.getElementById('detSubtotal1'),
        det50: document.getElementById('det50'),
        detFrecuencia: document.getElementById('detFrecuencia'),
        detSubtotal2: document.getElementById('detSubtotal2'),
        detTarjeta: document.getElementById('detTarjeta'),
        detVoucher: document.getElementById('detVoucher'),
        detToken: document.getElementById('detToken'),
        detCtaCte: document.getElementById('detCtaCte'),
        detGastos: document.getElementById('detGastos'),
        detTotalTitular: document.getElementById('detTotalTitular'),
        detChoferBase: document.getElementById('detChoferBase'),
        detChoferFrecuencia: document.getElementById('detChoferFrecuencia'),
        detTotalChofer: document.getElementById('detTotalChofer'),
        detOperacion: document.getElementById('detOperacion')
    };
}
