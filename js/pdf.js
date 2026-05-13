/* ============================================= */
/* EXPORTAR A PDF                                */
/* ============================================= */

const { jsPDF } = window.jspdf;

function exportarPDF() {
    const r = calcularTodo();
    
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    pdf.setFont('helvetica');
    
    // TITULO
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text('CIERRE DE TURNO', 105, 20, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text('Liquidacion para chofer y titular', 105, 28, { align: 'center' });
    
    let y = 40;
    
    // DATOS DEL TURNO
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('DATOS DEL TURNO', 20, y);
    y += 6;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Fecha: ${r.fechaFormateada}`, 20, y);
    y += 6;
    pdf.text(`Licencia: ${r.licencia}`, 20, y);
    y += 6;
    pdf.text(`Chofer: ${r.chofer}`, 20, y);
    y += 12;
    
    // MOVIMIENTOS
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('MOVIMIENTOS', 20, y);
    y += 6;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Cantidad de viajes: ${formatearNumero(r.viajes)}`, 20, y);
    pdf.text(`Kilometros recorridos: ${formatearNumero(r.kilometros)}`, 120, y);
    y += 6;
    pdf.text(`Recaudacion: ${formatearPesos(r.recaudacion)}`, 20, y);
    pdf.text(`Combustible: ${formatearPesos(r.combustible)}`, 120, y);
    y += 6;
    pdf.text(`Frecuencia: ${formatearPesos(r.frecuencia)}`, 20, y);
    pdf.text(`Tarjeta / QR: ${formatearPesos(r.tarjetaQr)}`, 120, y);
    y += 6;
    pdf.text(`Voucher: ${formatearPesos(r.voucher)}`, 20, y);
    pdf.text(`Token: ${formatearPesos(r.firmaTicket)}`, 120, y);
    y += 6;
    pdf.text(`Cuenta Corriente: ${formatearPesos(r.cuentaCorriente)}`, 20, y);
    pdf.text(`Gastos: ${formatearPesos(r.gastos)}`, 120, y);
    y += 12;
    
    // RESULTADOS
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('RESULTADOS', 20, y);
    y += 6;
    
    pdf.setFontSize(11);
    pdf.text(`TITULAR: ${formatearPesos(r.totalTitular)}`, 20, y);
    y += 7;
    pdf.text(`CHOFER: ${formatearPesos(r.totalChofer)}`, 20, y);
    y += 12;
    
    // PROMEDIOS
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('PROMEDIOS', 20, y);
    y += 6;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Promedio por viaje: ${formatearPesos(r.promedioViaje)}`, 20, y);
    y += 6;
    pdf.text(`Promedio por kilometro: ${formatearPesos(r.promedioKm)}`, 20, y);
    y += 12;
    
    // DESGLOSE TITULAR
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text('DESGLOSE TITULAR', 20, y);
    y += 6;
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Total (Recaudacion): ${formatearPesos(r.recaudacion)}`, 20, y);
    y += 5;
    pdf.text(`Combustible: - ${formatearPesos(r.combustible)}`, 20, y);
    y += 5;
    pdf.text(`Subtotal: ${formatearPesos(r.despuesCombustible)}`, 20, y);
    y += 5;
    pdf.text(`50%: ${formatearPesos(r.base50)}`, 20, y);
    y += 5;
    pdf.text(`Frecuencia: + ${formatearPesos(r.frecuencia)}`, 20, y);
    y += 5;
    pdf.text(`Sub total: ${formatearPesos(r.base50 + r.frecuencia)}`, 20, y);
    y += 5;
    pdf.text(`Tarjeta/QR: - ${formatearPesos(r.tarjetaQr)}`, 20, y);
    y += 5;
    pdf.text(`Voucher: - ${formatearPesos(r.voucher)}`, 20, y);
    y += 5;
    pdf.text(`Token: - ${formatearPesos(r.firmaTicket)}`, 20, y);
    y += 5;
    pdf.text(`Cuenta Corriente: - ${formatearPesos(r.cuentaCorriente)}`, 20, y);
    y += 5;
    pdf.text(`Gastos: - ${formatearPesos(r.gastos)}`, 20, y);
    y += 5;
    pdf.setFont(undefined, 'bold');
    pdf.text(`TOTAL TITULAR: ${formatearPesos(r.totalTitular)}`, 20, y);
    y += 8;
    
    // DESGLOSE CHOFER
    pdf.setFont(undefined, 'bold');
    pdf.text('DESGLOSE CHOFER', 20, y);
    y += 6;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(`Base 50%: ${formatearPesos(r.base50)}`, 20, y);
    y += 5;
    pdf.text(`Frecuencia: - ${formatearPesos(r.frecuencia)}`, 20, y);
    y += 5;
    pdf.setFont(undefined, 'bold');
    pdf.text(`TOTAL CHOFER: ${formatearPesos(r.totalChofer)}`, 20, y);
    y += 10;
    
    // NOTAS
    if (r.notas && r.notas.trim() !== '') {
        pdf.setFont(undefined, 'bold');
        pdf.text('NOTAS U OBSERVACIONES', 20, y);
        y += 6;
        pdf.setFont(undefined, 'normal');
        pdf.setFontSize(9);
        const notasLines = pdf.splitTextToSize(r.notas, 170);
        pdf.text(notasLines, 20, y);
        y += (notasLines.length * 5) + 8;
    }
    
    // FORMULA
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'italic');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Formula aplicada: (Recaudacion - Combustible) / 2 = Base 50%', 20, y);
    y += 4;
    pdf.text('Titular = Base + Frecuencia - (Tarjeta/QR + Voucher + Ticket + Cta Cte + Gastos)', 20, y);
    y += 4;
    pdf.text('Chofer = Base - Frecuencia', 20, y);
    
    // Guardar PDF
    pdf.save(`cierre_turno_${r.fechaFormateada.replace(/\//g, '-')}_${r.chofer || 'sin_nombre'}.pdf`);
}
