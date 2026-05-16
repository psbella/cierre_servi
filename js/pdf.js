/* ============================================= */
/* EXPORTAR A PDF - SERVI                        */
/* ============================================= */

function exportarPDF() {
    if (!window.jspdf) {
        alert('La librería de PDF no está disponible. Verificá tu conexión.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const r = calcularTodo();

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    pdf.setFont('helvetica');

    // --- Título ---
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('CIERRE DE TURNO - SERVI', 105, 20, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text('Liquidación para chofer y titular', 105, 28, { align: 'center' });

    let y = 40;

    // --- Datos del turno ---
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('DATOS DEL TURNO', 20, y);  y += 6;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Fecha: ${r.fechaFormateada}`, 20, y);    y += 6;
    pdf.text(`Licencia: ${r.licencia}`,      20, y);   y += 6;
    pdf.text(`Chofer: ${r.chofer}`,          20, y);   y += 12;

    // --- Movimientos ---
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('MOVIMIENTOS', 20, y);  y += 6;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Cantidad de viajes: ${formatearNumero(r.viajes)}`,      20,  y);
    pdf.text(`Kilómetros recorridos: ${formatearNumero(r.kilometros)}`, 120, y);  y += 6;
    pdf.text(`Total Reloj: ${formatearPesos(r.totalReloj)}`,           20,  y);   y += 6;
    pdf.text(`Relevo: - ${formatearPesos(r.relevo)}`,                  20,  y);   y += 6;
    pdf.text(`Total Recaudación: ${formatearPesos(r.totalRecaudacion)}`, 20, y);  y += 6;
    pdf.text(`Combustible: - ${formatearPesos(r.combustible)}`,        20,  y);   y += 6;
    pdf.text(`Frecuencia: ${formatearPesos(r.frecuencia)}`,            20,  y);
    pdf.text(`Tarjeta / QR: ${formatearPesos(r.tarjetaQr)}`,          120,  y);   y += 6;
    pdf.text(`Voucher: ${formatearPesos(r.voucher)}`,                  20,  y);
    pdf.text(`Firma Ticket: ${formatearPesos(r.firmaTicket)}`,        120,  y);   y += 6;
    pdf.text(`Cuenta Corriente: ${formatearPesos(r.cuentaCorriente)}`, 20,  y);
    pdf.text(`Gastos: ${formatearPesos(r.gastos)}`,                   120,  y);   y += 12;

    // --- Resultados ---
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('RESULTADOS', 20, y);  y += 6;
    pdf.text(`TITULAR: ${formatearPesos(r.totalTitular)}`, 20, y);  y += 7;
    pdf.text(`CHOFER: ${formatearPesos(r.totalChofer)}`,   20, y);  y += 12;

    // --- Promedios ---
    pdf.setFontSize(11);
    pdf.text('PROMEDIOS', 20, y);  y += 6;

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Promedio por viaje: ${formatearPesos(r.promedioViaje)}`,      20, y);  y += 6;
    pdf.text(`Promedio por kilómetro: ${formatearPesos(r.promedioKm)}`,     20, y);  y += 12;

    // --- Desglose titular ---
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('DESGLOSE TITULAR', 20, y);  y += 6;

    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    const filaTitular = [
        [`Total Reloj: ${formatearPesos(r.totalReloj)}`],
        [`Relevo: - ${formatearPesos(r.relevo)}`],
        [`Total Recaudación: ${formatearPesos(r.totalRecaudacion)}`],
        [`Combustible: - ${formatearPesos(r.combustible)}`],
        [`Subtotal: ${formatearPesos(r.subtotal)}`],
        [`50%: ${formatearPesos(r.base50)}`],
        [`Frecuencia: + ${formatearPesos(r.frecuencia)}`],
        [`Subtotal 2: ${formatearPesos(r.subTotal)}`],
        [`Tarjeta/QR: - ${formatearPesos(r.tarjetaQr)}`],
        [`Voucher: - ${formatearPesos(r.voucher)}`],
        [`Firma Ticket: - ${formatearPesos(r.firmaTicket)}`],
        [`Cuenta Corriente: - ${formatearPesos(r.cuentaCorriente)}`],
        [`Gastos: - ${formatearPesos(r.gastos)}`]
    ];
    filaTitular.forEach(([linea]) => { pdf.text(linea, 20, y);  y += 5; });
    pdf.setFont(undefined, 'bold');
    pdf.text(`TOTAL TITULAR: ${formatearPesos(r.totalTitular)}`, 20, y);  y += 8;

    // --- Desglose chofer ---
    pdf.setFont(undefined, 'bold');
    pdf.text('DESGLOSE CHOFER', 20, y);  y += 6;
    pdf.setFont(undefined, 'normal');
    pdf.text(`Base 50%: ${formatearPesos(r.base50)}`,            20, y);  y += 5;
    pdf.text(`Frecuencia: - ${formatearPesos(r.frecuencia)}`,    20, y);  y += 5;
    pdf.setFont(undefined, 'bold');
    pdf.text(`TOTAL CHOFER: ${formatearPesos(r.totalChofer)}`,   20, y);  y += 10;

    // --- Notas ---
    if (r.notas?.trim()) {
        pdf.setFont(undefined, 'bold');
        pdf.text('NOTAS U OBSERVACIONES', 20, y);  y += 6;
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        const notasLines = pdf.splitTextToSize(r.notas, 170);
        pdf.text(notasLines, 20, y);
        y += notasLines.length * 5 + 8;
    }

    // --- Fórmula aplicada ---
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'italic');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Fórmula: (Total Reloj - Relevo - Combustible) / 2 = Base 50%', 20, y);          y += 4;
    pdf.text('Titular = Base + Frecuencia - (Tarjeta/QR + Voucher + Firma Ticket + Cta Cte + Gastos)', 20, y);  y += 4;
    pdf.text('Chofer = Base - Frecuencia', 20, y);

    // --- Guardar ---
    const fechaSafe = r.fechaFormateada.replace(/\//g, '-');
    const choferSafe = r.chofer.replace(/\s+/g, '_') || 'sin_nombre';
    pdf.save(`cierre_turno_${fechaSafe}_${choferSafe}.pdf`);
}
