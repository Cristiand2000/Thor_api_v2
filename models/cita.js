const { Schema, model } = require('mongoose');

const CitaSchema = Schema({
    nombreYapellido: {
        type: String,
        required: [true, 'El nombre es requerido'],
        match: [/^[A-Za-z\s]+$/, 'El nombre solo debe contener letras y espacios']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es requerida'],
    },
    hora: {
        type: String,
        required: [true, 'La hora es requerida'],
        validate: {
            validator: function (value) {
                // Validación de hora en formato "HH:MM" y que no sea mayor a 24
                const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                return timePattern.test(value);
            },
            message: 'La hora debe estar en formato "HH:MM" y no puede ser mayor de 24 horas',
        },
    },
    restricciones: {
        type: String,
        required: [true, 'Las restricciones son requeridas'],
        match: [/^[A-Za-z0-9\s]+$/, 'Las restricciones solo deben contener letras, números y espacios']
    },
    tiposervicio: {
        type: String,
        required: [true, 'El tipo de servicio es requerido'],
        enum: ['nutricion', 'evaluacion'],
        match: [/^[A-Za-z]+$/, 'El tipo de servicio solo deben contener letras y solo puede ser evaluacion y nutricion']
    },
    estado: {
        type: Boolean,
        required: [true, 'El campo estado  es requerido'],
        default: true
    }
});

const Cita = model('Cita', CitaSchema);
module.exports = Cita;