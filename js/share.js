/* ============================================= */
/* COMPARTIR POR WHATSAPP Y EMAIL                */
/* ============================================= */

function generarMensajeTexto() {
    const r = calcularTodo();
    
    let mensaje = `CIERRE DE TURNO - SERVI v2
Fecha: ${r.fechaFormateada}
Chofer: ${r.chofer}
Licencia: ${r.licencia}

MOVIMIENTOS:
Viajes: ${formatearNumero(r.viajes)}
Kilometros: ${formatearNumero(r.kilometros)}
Total Reloj: ${formatearPesos(r.totalReloj)}
Relevo: - ${formatearPesos(r.relevo)}
Total Recaudacion: ${formatearPesos(r.totalRecaudacion)}
Combustible: - ${formatearPesos(r.combustible)}
Frecuencia: ${formatearPesos(r.frecuencia)}
Tarjeta/QR: ${formatearPesos(r.tarjetaQr)}
Voucher: ${formatearPesos(r.voucher)}
Firma Ticket: ${formatearPesos(r.firmaTicket)}
Cuenta Corriente: ${formatearPesos(r.cuentaCorriente)}
Gastos: ${formatearPesos(r.gastos)}

RESULTADOS:
TITULAR: ${formatearPesos(r.totalTitular)}
CHOFER: ${formatearPesos(r.totalChofer)}

PROMEDIOS:
Por viaje: ${formatearPesos(r.promedioViaje)}
Por kilometro: ${formatearPesos(r.promedioKm)}`;
    
    if (r.notas && r.notas.trim() !== '') {
        mensaje += `\n\nNOTAS:\n${r.notas}`;
    }
    
    return mensaje;
}

function enviarWhatsapp() {
    const mensaje = generarMensajeTexto();
    const textoCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/?text=${textoCodificado}`, '_blank');
}

function enviarEmail() {
    const r = calcularTodo();
    const mensaje = generarMensajeTexto();
    const asunto = `Cierre de turno - ${r.fecha} - ${r.chofer}`;
    const asuntoCodificado = encodeURIComponent(asunto);
    const cuerpoCodificado = encodeURIComponent(mensaje);
    window.open(`mailto:?subject=${asuntoCodificado}&body=${cuerpoCodificado}`, '_blank');
}
