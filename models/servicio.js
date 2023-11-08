const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    servicios: {
        type: String,
        required: [true, 'El servicio es requerido'],
        match: [/^[A-Za-z0-9\s]+$/, 'Los servicios solo deben contener letras, números y espacios']// Validación de coincidencia para letras y números        
    },
  
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es requerida'],
        min : 1,
        max : 7,
        match: [/^[0-9\s]+$/, 'La cantidad solo debe contener números y deben ser minimo 1 y maximo 7']
    },
  
    precio: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [6000, 'El precio mínimo permitido es 6000'],
        max: [1000000, 'El precio máximo permitido es 1000000'],
        match: [/^[0-9\s]+$/, 'El precio solo debe contener números y debe ser minimo 6000 y maximo 1000000']
    },
  
    estado: {
        type: Boolean,
    required: [true, 'El campo estado es requerido'],
    default: true
    },    
});

module.exports = model('Servicio', ServicioSchema);