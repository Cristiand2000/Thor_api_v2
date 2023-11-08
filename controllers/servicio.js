const { response } = require('express')

//Importar modelos
const Servicio = require('../models/servicio')


const servicioGet = async (req, res = response) => {

    const servicios = await Servicio.find()

    res.json({
        servicios
    })
}

const servicioPost = async (req, res = response) => {

    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)
    try {
        const servicio = new Servicio(body)
        await servicio.save()
        mensaje = "Exito en la insersion de los servicios"
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

const servicioPut = async (req, res = response) => {
    const { servicios,cantidad,precio,estado } = req.body//modificar

  

    try {
        const servicio = await Servicio.findOneAndUpdate({ _id: _id }, {servicios,cantidad,  precio,  estado }, {new:true})//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        if (servicio) {
            res.json({
                msg: 'La modificación de los servicios se efectuó exitosamente',
                servicio
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró ningún servicio con el ID proporcionado'
            });
        }
    }  catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}

const servicioDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const servicio = await Servicio.deleteOne({ _id: _id })
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
    servicioGet,
    servicioPost,
    servicioPut,
    servicioDelete}