/* ============================================= */
/* SUPABASE FUNCTIONS                            */
/* ============================================= */

// REGISTRO
async function registrarUsuario(email, password, nombre, legajo) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                nombre: nombre,
                legajo: legajo
            }
        }
    });

    if (!error && data.user) {
        await supabase.from('perfiles').insert([{
            id: data.user.id,
            email: email,
            nombre: nombre,
            legajo: legajo,
            rol: 'chofer'
        }]);
    }

    return { data, error };
}

// LOGIN
async function loginUsuario(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    return { data, error };
}

// LOGOUT
async function logoutUsuario() {
    const { error } = await supabase.auth.signOut();
    return { error };
}

// USUARIO ACTUAL
async function obtenerUsuarioActual() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
}

// OBTENER PERFIL
async function obtenerPerfil(userId) {
    const { data, error } = await supabase
        .from('perfiles')
        .select('*')
        .eq('id', userId)
        .single();
    return { perfil: data, error };
}

// GUARDAR TURNO
async function guardarTurnoEnSupabase(turno) {
    const { user } = await obtenerUsuarioActual();
    if (!user) return { error: 'No hay usuario logueado' };

    const { data, error } = await supabase
        .from('turnos')
        .insert([{
            usuario_id: user.id,
            fecha: turno.fecha,
            total_reloj: turno.totalReloj,
            relevo: turno.relevo,
            combustible: turno.combustible,
            frecuencia: turno.frecuencia,
            tarjeta_qr: turno.tarjetaQr,
            voucher: turno.voucher,
            firma_ticket: turno.firmaTicket,
            cuenta_corriente: turno.cuentaCorriente,
            gastos: turno.gastos,
            total_titular: turno.totalTitular,
            total_chofer: turno.totalChofer,
            notas: turno.notas
        }]);

    return { data, error };
}

// CARGAR HISTORIAL
async function cargarHistorialDesdeSupabase() {
    const { user } = await obtenerUsuarioActual();
    if (!user) return { data: null, error: 'No hay usuario logueado' };

    const { perfil } = await obtenerPerfil(user.id);
    const esAdmin = perfil?.rol === 'admin';

    let query = supabase.from('turnos').select('*');

    if (!esAdmin) {
        query = query.eq('usuario_id', user.id);
    }

    const { data, error } = await query.order('fecha', { ascending: false });
    return { data, error };
}
