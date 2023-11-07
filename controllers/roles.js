const { response } = require('express')

//Importar modelos
const Roles = require('../models/roles')


const rolesGet = async (req, res = response) => {

    const roles = await Roles.find()

    res.json({
        roles
    })
}

const rolesPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const roles = new Roles(body)
        await roles.save()
        mensaje = "Exito en la insersion de roles"
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

const rolesPut = async (req, res = response) => {
    const { _id, nombreRol, PermisosRol,  estadorol } = req.body;
    
    try {
        const roles = await Roles.findByIdAndUpdate(_id, {
             nombreRol, PermisosRol, estadorol
        }, { new: true }); 

        if (roles) {
            res.json({
                msg: 'La modificación del rol se efectuó exitosamente',
                roles 
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró ningún rol con el ID proporcionado'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};


const rolesDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const roles = await Roles.deleteOne({ _id: _id })
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
    rolesGet,
    rolesPost,
    rolesPut,
    rolesDelete
}