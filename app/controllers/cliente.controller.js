const Cliente = require("../models/cliente.model.js");

exports.create = (req,res) => {

    if(!req.body) {
        res.status(400).send({
            message: "contenido no puede estar vacio"
        });
    }

    const cliente = new Cliente({
        email: req.body.email,
        nombre: req.body.nombre,
        activo: req.body.activo
    });

    Cliente.create(cliente, (err, data) => {
        if (err)
        res.status(500).send({
            message:
                err.message || "Ocurrio un error en la creacion del cliente."
        });
        else res.send(data);
    });
};

exports.finAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ocurrio un error recuperando los clientes."
            });
        else res.send(data);
    });
};

exports.finOne = (req, res) => {
    Cliente.findById(req.params.clienteId, (err,data) => {
        if (err) {
            if (err.kind === "not_found"){
                res.status(404).send({
                    message: "Cliente no encontrado con el id ${req.params.clienteId}."
                });
            } else {
                res.status(500).send({
                    message: "error recuperando cliente with id " + req.params.clienteId
                });
            }
        }   else res.send(data);
    });
};


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "el contenido no puede estar vacio"
        });
    }

    Cliente.updateById(
        req.params.clienteId,
        new Cliente(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "no_encontrado"){
                    res.status(404).send({
                        message:"cliente no encontrado con el id ${req.params.clienteId}."
                    });
                }   else{
                    res.status(500).send({
                        message: "error modificando cliente con id " + req.params.clienteId
                    });
                }
            }   else res.send(data);
        }
    );
};


exports.delete = (req, res) => {
    Cliente.remove(req.params.clienteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "cliente no encontrado con id ${req.params.clienteId}."
                });
            }  else {
                res.status(500).send({
                    message: "no se puede eliminar cliente con el id " + req.params.clienteId
                });
            }
        }   else res.send({ message: "cliente eliminado con exito"})   
    });   
};


exports.deleteAll = (req, res) => {
    Cliente.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ocurrio un error al eliminar los clientes."
            });
        else res.send({ message: "todos los clientes fueron borrados con exito"});
    });
};

