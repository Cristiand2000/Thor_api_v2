

const { Schema, model } = require('mongoose');

const SuscripcionesSchema = Schema({
   tipoDocumento:{
    type: String,
    required: [true, 'El tipo de documento es requerido'],
    enum: ['Cedula', 'Tarjeta identidad', 'Cedula extranjera'],
    match: [/^[A-Za-z\s]+$/, 'El tipo de documento solo debe contener letras y espacios']
   },
   Documento: {
    type: Number,
    required: [true, 'El campo documento es obligatorio'],
    validate: {
        validator: function (value) {
            return /^[0-9]+$/.test(value); // La cédula debe contener solo números positivos
        },
        message: 'el documento debe contener solo números'
    }
 },

   nombres: {
    type: String,
    required: [true, 'El campo nombres es requerido'],
    match: [/^[A-Za-z\s]+$/, 'El nombre solo debe contener letras y espacios']
 },
  apellidos: {
    type: String,
    required: [true, 'El campo apellidos es requerido'],
    match: [/^[A-Za-z\s]+$/, 'Los apellidos solo debe contener letras y espacios']
 },
 direccion: {
    type: String,
    required: [true, 'El campo direccion es requerido']
  },
  telefono: {
    type: String,
    required: [true, 'El campo telefono es obligatorio'],
    match: [/^\d{10,15}$/, 'El campo telefono debe contener entre 10 y 15 dígitos numéricos']
 },
 correo: {
    type: String,
    required: [true, 'El campo correo es obligatorio'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor, ingresa un correo electrónico válido']
 },
 password: {
    type: String,
    required: [true, 'El password es requerido'],
    minlength: [3, 'Debe tener mínimo 3 caracteres'],
    maxlength: [7, 'Debe tener máximo 7 caracteres']
 }, 
 estado: {
    type: Boolean,
    required: [true, 'El campo estado del usuario es requerido'],
    default: true
 },
 eps: {
    type: String,
    required: [true, 'El campo eps es obligatorio'],
    match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo eps']
 },


    tipoPaquete: {
        type: String,
        required: [true, 'El tipo de paquete es requerido'],
        match: [/^[A-Za-z\s]+$/, 'El nombre solo debe contener letras y espacios']
    },
    fechaPago: {
        type: String,
        required: [true, 'La fecha de pago es requerida'],
    },
    precio:{
    type: [{
        type: Number,
    }],
    required: [true, 'el precio  es requerido'],
    min: [10000, 'El total mínimo permitido es 10000'],
    max: [1000000, 'El total máximo permitido es 1000000'],
    match: [/^[0-9\s]+$/, 'El total solo debe contener números y debe ser minimo 10000 y maximo 1000000']
 },
 tipoPago:{
    type: String,
    required: [true, 'El tipo de pago es requerido'],
    match: [/^[A-Za-z\s]+$/, 'El tipo pago solo debe contener letras y espacios'],
    enum: ['Efectivo','Transferencia'],
 },
 estadoSuscripcion: {
    type: Boolean,
    required: [true, 'El campo estado suscripcion es requerido'],
    default: true
  }
});

module.exports = model('Suscripciones', SuscripcionesSchema);


