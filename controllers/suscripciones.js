const { response } = require('express')

//Importar modelos
const Suscripciones = require('../models/suscripciones')


const suscripcionesGet = async (req, res = response) => {

    const suscripciones = await Suscripciones.find()

    res.json({
        suscripciones
    })
}

const suscripcionesPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const suscripciones = new Suscripciones(body)
        await suscripciones.save()
        mensaje = "Exito en la insersion de suscripciones"
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.log(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}
const suscripcionesPut = async (req, res = response) => {
    const { _id,tipoDocumento,Documento,nombres,apellidos,direccion,telefono,correo,password,estado,epstipoPaquete, fechaPago,precio,tipoPago,  estadoSuscripcion } = req.body;

    
    try {
        const roles = await Suscripciones.findByIdAndUpdate({ _id: _id}, {tipoDocumento,Documento,nombres,apellidos,direccion,telefono,correo,password,estado,epstipoPaquete, fechaPago,precio,tipoPago,  estadoSuscripcion}, { new: true }); 

        if (roles) {
            res.json({
                msg: 'La modificación de la suscripcion se efectuó exitosamente',
                roles 
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró ningúna suscripcion con el ID proporcionado'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};


const suscripcionesDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const suscripciones = await Suscripciones.deleteOne({ _id: _id })
        res.status(200).json({
            msg: 'La elimicacion se efectuó exitosamente'
        });
    }
    catch (e) {
        console.error(e); // Log del error para depuración
        res.status(500).json({
            msg: 'Se presentaron problemas en la eliminación'
        });
    }
}

module.exports = {
    suscripcionesGet,
    suscripcionesPost,
    suscripcionesPut,
    suscripcionesDelete
}


