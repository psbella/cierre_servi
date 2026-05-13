/* ============================================= */
/* LOGICA PRINCIPAL                              */
/* ============================================= */

// Limpiar campo fecha al cargar
document.getElementById('fecha').value = '';

function actualizarPantalla() {
    const r = calcularTodo();
    const elementos = obtenerElementosDOM();
    const detalle = obtenerElementosDetalle();
    
    // Actualizar resultados principales
    elementos.totalTitular.textContent = formatearPesos(r.totalTitular);
    elementos.totalChofer.textContent = formatearPesos(r.totalChofer);
    elementos.promedioViaje.textContent = formatearPesos(r.promedioViaje);
    elementos.promedioKm.textContent = formatearPesos(r.promedioKm);
    
    // Actualizar detalle TITULAR
    detalle.detTotal.textContent = formatearPesos(r.recaudacion);
    detalle.detCombustible.textContent = formatearPesos(r.combustible);
    detalle.detSubtotal1.textContent = formatearPesos(r.despuesCombustible);
    detalle.det50.textContent = formatearPesos(r.base50);
    detalle.detFrecuencia.textContent = formatearPesos(r.frecuencia);
    detalle.detSubtotal2.textContent = formatearPesos(r.base50 + r.frecuencia);
    detalle.detTarjeta.textContent = formatearPesos(r.tarjetaQr);
    detalle.detVoucher.textContent = formatearPesos(r.voucher);
    detalle.detToken.textContent = formatearPesos(r.firmaTicket);
    detalle.detCtaCte.textContent = formatearPesos(r.cuentaCorriente);
    detalle.detGastos.textContent = formatearPesos(r.gastos);
    detalle.detTotalTitular.textContent = formatearPesos(r.totalTitular);
    
    // Actualizar detalle CHOFER
    detalle.detChoferBase.textContent = formatearPesos(r.base50);
    detalle.detChoferFrecuencia.textContent = formatearPesos(r.frecuencia);
    detalle.detTotalChofer.textContent = formatearPesos(r.totalChofer);
    
    // Mostrar operacion completa
    detalle.detOperacion.innerHTML = `TITULAR: ${formatearPesos(r.recaudacion)} - ${formatearPesos(r.combustible)} = ${formatearPesos(r.despuesCombustible)} / 2 = ${formatearPesos(r.base50)} + ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.base50 + r.frecuencia)} - (${formatearPesos(r.tarjetaQr)} + ${formatearPesos(r.voucher)} + ${formatearPesos(r.firmaTicket)} + ${formatearPesos(r.cuentaCorriente)} + ${formatearPesos(r.gastos)}) = ${formatearPesos(r.totalTitular)}<br><br>CHOFER: ${formatearPesos(r.base50)} - ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.totalChofer)}`;
}

// Navegacion con Enter (PC)
function setupEnterNavigation() {
    const campos = document.querySelectorAll('input, textarea');
    campos.forEach((campo, index) => {
        campo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const siguienteCampo = campos[index + 1];
                if (siguienteCampo) {
                    siguienteCampo.focus();
                    siguienteCampo.select();
                }
            }
        });
    });
}

// Eventos de los botones
document.getElementById('exportarPDF').addEventListener('click', exportarPDF);
document.getElementById('enviarWhatsapp').addEventListener('click', enviarWhatsapp);
document.getElementById('enviarEmail').addEventListener('click', enviarEmail);

// Activar navegacion con Enter
setupEnterNavigation();

// Actualizar al escribir en cualquier campo
const todosLosCampos = document.querySelectorAll('input, textarea');
todosLosCampos.forEach(campo => {
    campo.addEventListener('input', actualizarPantalla);
});

// Inicializar
actualizarPantalla();
