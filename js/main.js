/* ============================================= */
/* LOGICA PRINCIPAL - SERVI v2                   */
/* ============================================= */

// Limpiar campo fecha al cargar
const fechaInput = document.getElementById('fecha');
if (fechaInput) fechaInput.value = '';

// =============================================
// COMBUSTIBLE DINÁMICO
// =============================================

const combustiblePrincipal = document.getElementById('combustiblePrincipal');
const containerCombustible = document.getElementById('combustibleContainer');
const totalCombustibleDiv = document.getElementById('totalCombustible');
let inputsCombustible = [];

function calcularTotalCombustible() {
    let total = parseFloat(combustiblePrincipal?.value) || 0;
    inputsCombustible.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    if (totalCombustibleDiv) {
        totalCombustibleDiv.innerHTML = `<strong>Total combustible: $${total.toLocaleString('es-AR')}</strong>`;
    }
    // ✅ Elimina las siguientes líneas para romper el bucle
    // if (combustiblePrincipal) {
    //     const event = new Event('input', { bubbles: true });
    //     combustiblePrincipal.dispatchEvent(event);
    // }
}
    }
    // Disparar evento para actualizar cálculos principales
    if (combustiblePrincipal) {
        const event = new Event('input', { bubbles: true });
        combustiblePrincipal.dispatchEvent(event);
    }
}

function agregarCampoCombustible() {
    const index = inputsCombustible.length;
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '8px';
    div.style.marginBottom = '8px';
    div.style.alignItems = 'center';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Carga ${index + 1}`;
    input.inputMode = 'numeric';
    input.pattern = '[0-9]*';
    input.style.flex = '1';
    input.style.padding = '8px 12px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '8px';
    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '✕';
    btnEliminar.style.width = '32px';
    btnEliminar.style.background = '#e74c3c';
    btnEliminar.style.color = 'white';
    btnEliminar.style.border = 'none';
    btnEliminar.style.borderRadius = '8px';
    btnEliminar.style.cursor = 'pointer';
    
    btnEliminar.addEventListener('click', () => {
        div.remove();
        const pos = inputsCombustible.indexOf(input);
        if (pos !== -1) inputsCombustible.splice(pos, 1);
        calcularTotalCombustible();
        inputsCombustible.forEach((inp, i) => {
            inp.placeholder = `Carga ${i + 1}`;
        });
    });
    
    input.addEventListener('input', () => {
        calcularTotalCombustible();
    });
    
    div.appendChild(input);
    div.appendChild(btnEliminar);
    if (containerCombustible) containerCombustible.appendChild(div);
    inputsCombustible.push(input);
    calcularTotalCombustible();
}

const btnAgregarCombustible = document.getElementById('btnAgregarCombustible');
if (btnAgregarCombustible) {
    btnAgregarCombustible.addEventListener('click', agregarCampoCombustible);
}

if (combustiblePrincipal) {
    combustiblePrincipal.addEventListener('input', calcularTotalCombustible);
}

// =============================================
// ACTUALIZAR PANTALLA (CÁLCULOS)
// =============================================

function actualizarPantalla() {
    const r = calcularTodo();
    const elementos = obtenerElementosDOM();
    const detalle = obtenerElementosDetalle();
    
    if (elementos.totalTitular) elementos.totalTitular.textContent = formatearPesos(r.totalTitular);
    if (elementos.totalChofer) elementos.totalChofer.textContent = formatearPesos(r.totalChofer);
    if (elementos.promedioViaje) elementos.promedioViaje.textContent = formatearPesos(r.promedioViaje);
    if (elementos.promedioKm) elementos.promedioKm.textContent = formatearPesos(r.promedioKm);
    
    if (detalle.detTotal) detalle.detTotal.textContent = formatearPesos(r.totalRecaudacion);
    if (detalle.detCombustible) detalle.detCombustible.textContent = formatearPesos(r.combustible);
    if (detalle.detSubtotal1) detalle.detSubtotal1.textContent = formatearPesos(r.subtotal);
    if (detalle.det50) detalle.det50.textContent = formatearPesos(r.base50);
    if (detalle.detFrecuencia) detalle.detFrecuencia.textContent = formatearPesos(r.frecuencia);
    if (detalle.detSubtotal2) detalle.detSubtotal2.textContent = formatearPesos(r.subTotal);
    if (detalle.detTarjeta) detalle.detTarjeta.textContent = formatearPesos(r.tarjetaQr);
    if (detalle.detVoucher) detalle.detVoucher.textContent = formatearPesos(r.voucher);
    if (detalle.detToken) detalle.detToken.textContent = formatearPesos(r.firmaTicket);
    if (detalle.detCtaCte) detalle.detCtaCte.textContent = formatearPesos(r.cuentaCorriente);
    if (detalle.detGastos) detalle.detGastos.textContent = formatearPesos(r.gastos);
    if (detalle.detTotalTitular) detalle.detTotalTitular.textContent = formatearPesos(r.totalTitular);
    
    if (detalle.detChoferBase) detalle.detChoferBase.textContent = formatearPesos(r.base50);
    if (detalle.detChoferFrecuencia) detalle.detChoferFrecuencia.textContent = formatearPesos(r.frecuencia);
    if (detalle.detTotalChofer) detalle.detTotalChofer.textContent = formatearPesos(r.totalChofer);
    
    if (detalle.detOperacion) {
        detalle.detOperacion.innerHTML = `TITULAR: Total Reloj ${formatearPesos(r.totalReloj)} - Relevo ${formatearPesos(r.relevo)} = ${formatearPesos(r.totalRecaudacion)} - Combustible ${formatearPesos(r.combustible)} = ${formatearPesos(r.subtotal)} / 2 = ${formatearPesos(r.base50)} + Frecuencia ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.subTotal)} - (Tarjeta/QR ${formatearPesos(r.tarjetaQr)} + Voucher ${formatearPesos(r.voucher)} + Firma Ticket ${formatearPesos(r.firmaTicket)} + Cta Cte ${formatearPesos(r.cuentaCorriente)} + Gastos ${formatearPesos(r.gastos)}) = ${formatearPesos(r.totalTitular)}<br><br>CHOFER: ${formatearPesos(r.base50)} - Frecuencia ${formatearPesos(r.frecuencia)} = ${formatearPesos(r.totalChofer)}`;
    }
}

// =============================================
// LOGIN / REGISTRO / MODALES
// =============================================

const btnLoginHeader = document.getElementById('btnLoginHeader');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeRegisterModalBtn = document.getElementById('closeRegisterModalBtn');
const showRegisterLink = document.getElementById('showRegisterLink');

if (btnLoginHeader) {
    btnLoginHeader.onclick = () => {
        if (loginModal) loginModal.style.display = 'flex';
    };
}
if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        if (loginModal) loginModal.style.display = 'none';
    };
}
if (closeRegisterModalBtn) {
    closeRegisterModalBtn.onclick = () => {
        if (registerModal) registerModal.style.display = 'none';
    };
}
if (showRegisterLink) {
    showRegisterLink.onclick = (e) => {
        e.preventDefault();
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'flex';
    };
}

// Login mediante formulario
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (!email || !password) {
            alert('Completá email y contraseña');
            return;
        }
        const { error } = await loginUsuario(email, password);
        if (error) alert('Error: ' + error.message);
        else location.reload();
    });
}

// Registro mediante formulario
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('regNombre').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const legajo = document.getElementById('regLegajo').value;
        if (!nombre || !email || !password || !legajo) {
            alert('Completá todos los campos');
            return;
        }
        const { error } = await registrarUsuario(email, password, nombre, legajo);
        if (error) alert('Error: ' + error.message);
        else {
            alert('Usuario registrado. Revisá tu email para confirmar.');
            if (registerModal) registerModal.style.display = 'none';
        }
    });
}

// Cerrar sesión
const btnLogoutHeader = document.getElementById('btnLogoutHeader');
if (btnLogoutHeader) {
    btnLogoutHeader.onclick = async () => {
        await logoutUsuario();
        location.reload();
    };
}

// =============================================
// VERIFICAR SESIÓN AL INICIAR
// =============================================

async function verificarSesion() {
    const { data: { user }, error } = await supabase.auth.getUser();
    const btnLogin = document.getElementById('btnLoginHeader');
    const userInfo = document.getElementById('userLoggedInfo');
    const userNameSpan = document.getElementById('userNameDisplay');
    const userLegajoSpan = document.getElementById('userLegajoDisplay');
    
    if (user && !error) {
        if (btnLogin) btnLogin.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = user.email;
        if (userLegajoSpan) userLegajoSpan.textContent = `ID: ${user.id.slice(0,8)}...`;
        
        const { data } = await cargarHistorialDesdeSupabase();
        if (data?.length) mostrarHistorial(data);
        else {
            const container = document.getElementById('historialContainer');
            if (container) container.innerHTML = '<p>No hay turnos guardados</p>';
        }
    } else {
        if (btnLogin) btnLogin.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
}

function mostrarHistorial(turnos) {
    const container = document.getElementById('historialContainer');
    if (!container) return;
    if (!turnos?.length) {
        container.innerHTML = '<p>No hay turnos guardados</p>';
        return;
    }
    container.innerHTML = turnos.map(t => `
        <div style="padding: 8px; border-bottom: 1px solid #ddd;">
            <strong>${t.fecha}</strong><br>
            Total Reloj: $${t.total_reloj?.toLocaleString() || 0}<br>
            Titular: $${t.total_titular?.toLocaleString() || 0}<br>
            Chofer: $${t.total_chofer?.toLocaleString() || 0}
        </div>
    `).join('');
}

// =============================================
// NAVEGACIÓN CON ENTER
// =============================================

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

// =============================================
// EVENTOS DE BOTONES PRINCIPALES
// =============================================

const btnPDF = document.getElementById('exportarPDF');
const btnWhatsapp = document.getElementById('enviarWhatsapp');
const btnEmail = document.getElementById('enviarEmail');
const guardarTurnoBtn = document.getElementById('guardarTurnoBtn');

if (btnPDF) btnPDF.addEventListener('click', exportarPDF);
if (btnWhatsapp) btnWhatsapp.addEventListener('click', enviarWhatsapp);
if (btnEmail) btnEmail.addEventListener('click', enviarEmail);
if (guardarTurnoBtn) {
    guardarTurnoBtn.addEventListener('click', async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert('Iniciá sesión para guardar turnos');
            if (loginModal) loginModal.style.display = 'flex';
            return;
        }
        const r = calcularTodo();
        const turno = {
            fecha: r.fecha,
            totalReloj: r.totalReloj,
            relevo: r.relevo,
            combustible: r.combustible,
            frecuencia: r.frecuencia,
            tarjetaQr: r.tarjetaQr,
            voucher: r.voucher,
            firmaTicket: r.firmaTicket,
            cuentaCorriente: r.cuentaCorriente,
            gastos: r.gastos,
            totalTitular: r.totalTitular,
            totalChofer: r.totalChofer,
            notas: r.notas
        };
        const { error } = await guardarTurnoEnSupabase(turno);
        if (error) alert('Error al guardar: ' + error.message);
        else {
            alert('Turno guardado');
            const { data } = await cargarHistorialDesdeSupabase();
            if (data?.length) mostrarHistorial(data);
        }
    });
}

// =============================================
// INICIALIZAR
// =============================================

setupEnterNavigation();

const todosLosCampos = document.querySelectorAll('input, textarea');
todosLosCampos.forEach(campo => {
    campo.addEventListener('input', actualizarPantalla);
});

calcularTotalCombustible();
verificarSesion();
actualizarPantalla();
