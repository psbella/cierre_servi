/* ============================================= */
/* COMPARTIR POR WHATSAPP Y EMAIL - SERVI        */
/* ============================================= */

function generarMensajeTexto() {
    const r = calcularTodo();

    let mensaje =
`CIERRE DE TURNO - SERVI
Fecha: ${r.fechaFormateada}
Chofer: ${r.chofer}
Licencia: ${r.licencia}

MOVIMIENTOS:
Viajes: ${formatearNumero(r.viajes)}
Kilómetros: ${formatearNumero(r.kilometros)}
Total Reloj: ${formatearPesos(r.totalReloj)}
Relevo: - ${formatearPesos(r.relevo)}
Total Recaudación: ${formatearPesos(r.totalRecaudacion)}
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
Por kilómetro: ${formatearPesos(r.promedioKm)}`;

    if (r.notas?.trim()) {
        mensaje += `\n\nNOTAS:\n${r.notas}`;
    }

    return mensaje;
}

function enviarWhatsapp() {
    const texto = encodeURIComponent(generarMensajeTexto());
    window.open(`https://wa.me/?text=${texto}`, '_blank');
}

function enviarEmail() {
    const r       = calcularTodo();
    const asunto  = encodeURIComponent(`Cierre de turno - ${r.fecha} - ${r.chofer}`);
    const cuerpo  = encodeURIComponent(generarMensajeTexto());
    window.open(`mailto:?subject=${asunto}&body=${cuerpo}`, '_blank');
}
