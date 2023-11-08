const { Schema, model } = require('mongoose');

const permisosValidos = ['Agenda', 'citas', 'clientes', 'empleados', 'paquetes', 'programacion', 'servicios', 'roles', 'usuarios', 'suscripciones'];

const RolesSchema = Schema({
    nombreRol: {
        type: String,
        required: [true, 'El nombre del rol es requerido'],
        enum: ['Administrador', 'Cliente', 'Empleado'],
        match: [/^[A-Za-z\s]+$/, 'El nombre solo debe contener letras y espacios']
    },
    PermisosRol: {
        type: [{
            type: String,
            enum: permisosValidos
        }],
        required: [true, 'Los permisos son requeridos'],
    },
    estadorol: {
        type: Boolean,
        required: [true, 'El campo estado rol es requerido'],
        default: true
      }
});

module.exports = model('Roles', RolesSchema);
