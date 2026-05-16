/* ============================================= */
/* LOGICA PRINCIPAL - SERVI v2                   */
/* ============================================= */

// Limpiar campo fecha al cargar
document.getElementById('fecha').value = '';

// Array para almacenar las cargas de combustible
let cargasCombustible = [];

// Elementos del DOM para combustible
const combustibleInput = document.getElementById('combustible');
const listaCargasDiv = document.getElementById('listaCargasCombustible');
const totalCombustibleDiv = document.getElementById('totalCombustible');

// Función para actualizar la lista y el total de combustible
function actualizarListaCombustible() {
    if (cargasCombustible.length === 0) {
        listaCargasDiv.innerHTML = '<span style="color: #999;">Sin cargas registradas</span>';
        totalCombustibleDiv.innerHTML = '';
    } else {
        listaCargasDiv.innerHTML = cargasCombustible.map((carga, index) => 
            `<div style="display: flex; justify-content: space-between; padding: 2px 0;">
                <span>Carga ${index + 1}:</span>
                <span>$${carga.toLocaleString('es-AR')}</span>
             </div>`
        ).join('');
        
        const total = cargasCombustible.reduce((a, b) => a + b, 0);
        totalCombustibleDiv.innerHTML = `<strong>Total combustible: $${total.toLocaleString('es-AR')}</strong>`;
        
        // Actualizar el input con el total
        combustibleInput.value = total;
        combustibleInput.dispatchEvent(new Event('input'));
    }
}

// Botón para agregar carga de combustible
const btnCombustible = document.getElementById('btnAgregarCombustible');
if (btnCombustible) {
    btnCombustible.addEventListener('click', () => {
        const nuevoValor = prompt('Ingrese el monto de la carga de combustible:', '0');
        if (nuevoValor !== null) {
            const adicional = parseFloat(nuevoValor) || 0;
            if (adicional > 0) {
                cargasCombustible.push(adicional);
                actualizarListaCombustible();
            } else {
                alert('Ingrese un monto válido mayor a 0');
            }
        }
    });
}

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
    detalle.detTotal.textContent = formatearPesos(r.totalRecaudacion);
    detalle.detCombustible.textContent = formatearPesos(r.combustible);
    detalle.detSubtotal1.textContent = formatearPesos(r.subtotal);
    detalle.det50.textContent = formatearPesos(r.base50);
    detalle.detFrecuencia.textContent = formatearPesos(r.frecuencia);
    detalle.detSubtotal2.textContent = formatearPesos(r.subTotal);
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
    detalle.detOperacion.innerHTML = `TITULAR: Total Reloj ${formatearPesos(r.totalReloj)} - Relevo ${formatearPesos(r.relevo)} = ${formatearPesos(r.totalRecaudacion)} - Combustible ${formatearPesos(r.combustible)} = ${formatearPesos(r.subtotal)} / 2 = ${formatearPesos(r.base50)} + Frecuencia ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.subTotal)} - (Tarjeta/QR ${formatearPesos(r.tarjetaQr)} + Voucher ${formatearPesos(r.voucher)} + Firma Ticket ${formatearPesos(r.firmaTicket)} + Cta Cte ${formatearPesos(r.cuentaCorriente)} + Gastos ${formatearPesos(r.gastos)}) = ${formatearPesos(r.totalTitular)}<br><br>CHOFER: ${formatearPesos(r.base50)} - Frecuencia ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.totalChofer)}`;
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

// Inicializar lista de combustible
actualizarListaCombustible();

// Inicializar
actualizarPantalla();
