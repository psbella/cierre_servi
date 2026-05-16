// =============================================
// BOTONES Y MODALES (CON VERIFICACIONES)
// =============================================

const btnLoginHeader = document.getElementById('btnLoginHeader');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeRegisterModalBtn = document.getElementById('closeRegisterModalBtn');
const showRegisterLink = document.getElementById('showRegisterLink');

// Verificar que los elementos existen
console.log('btnLoginHeader:', btnLoginHeader);
console.log('loginModal:', loginModal);
console.log('registerModal:', registerModal);

if (btnLoginHeader) {
    btnLoginHeader.onclick = () => {
        console.log('Click en login');
        if (loginModal) loginModal.style.display = 'flex';
        else alert('Error: loginModal no encontrado');
    };
} else {
    console.error('No se encontró el botón btnLoginHeader');
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

// Botón de login dentro del modal
const btnLoginModal = document.getElementById('btnLoginModal');
if (btnLoginModal) {
    btnLoginModal.onclick = async () => {
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        if (!email || !password) {
            alert('Completá email y contraseña');
            return;
        }
        const { error } = await loginUsuario(email, password);
        if (error) alert('Error: ' + error.message);
        else location.reload();
    };
}

// Botón de registro dentro del modal
const btnRegisterModal = document.getElementById('btnRegisterModal');
if (btnRegisterModal) {
    btnRegisterModal.onclick = async () => {
        const nombre = document.getElementById('regNombre')?.value;
        const email = document.getElementById('regEmail')?.value;
        const password = document.getElementById('regPassword')?.value;
        const legajo = document.getElementById('regLegajo')?.value;
        if (!nombre || !email || !password || !legajo) {
            alert('Completá todos los campos');
            return;
        }
        const { error } = await registrarUsuario(email, password, nombre, legajo);
        if (error) alert('Error: ' + error.message);
        else {
            alert('Usuario registrado. Revisá tu email para confirmar.');
            registerModal.style.display = 'none';
        }
    };
}

// Cerrar sesión
const btnLogoutHeader = document.getElementById('btnLogoutHeader');
if (btnLogoutHeader) {
    btnLogoutHeader.onclick = async () => {
        await logoutUsuario();
        location.reload();
    };
}

// Verificar sesión al cargar
async function verificarSesion() {
    const { data: { user } } = await supabase.auth.getUser();
    const btnLogin = document.getElementById('btnLoginHeader');
    const userInfo = document.getElementById('userLoggedInfo');
    const userNameSpan = document.getElementById('userNameDisplay');
    const userLegajoSpan = document.getElementById('userLegajoDisplay');
    
    if (user) {
        usuarioActual = user;
        const { perfil } = await obtenerPerfil(user.id);
        if (btnLogin) btnLogin.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (userNameSpan) userNameSpan.textContent = perfil?.nombre || user.email;
        if (userLegajoSpan) userLegajoSpan.textContent = `Legajo: ${perfil?.legajo || 'N/A'}`;
        
        const { data } = await cargarHistorialDesdeSupabase();
        if (data?.length) mostrarHistorial(data);
        else {
            const container = document.getElementById('historialContainer');
            if (container) container.innerHTML = '<p>No hay turnos guardados</p>';
        }
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

// Inicializar
verificarSesion();
