const sql = require("./db.js");

const Cliente = function(cliente){
    this.email = cliente.email;
    this.nombre = cliente.nombre;
    this.activo = cliente.activo;
};

Cliente.create = (newCliente, result) => {
    sql.query("insert into clientes set ?", newCliente, (err, res) => {
        if (err) {
            console.log("error:, ", err);
            result(err, null);
            return;
        }

        console.log("crear cliente: ", { id: res.insertID, ...newCliente});
        result(null, { id: res.insertID, ...newCliente});
    });
};


Cliente.findById = (clienteId, result) => {
    sql.query("select * from clientes where id = ${clienteId}", (err,res) => {
        if (err) {
            console.log("error: ",err);
            result(err, null);
            return;
        }

        if (res.length){
            console.log("hallar cliente: ",res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "no_encontrado"}, null);
    });
};


Cliente.getAll = result => {
    sql.query("select * from clientes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("cliente: ",res);
        result(null, res);
    });
};

Cliente.updateById = (id, cliente, result) => {
    sql.query(
        "update clientes set email = ?, nombre = ?, activo= ? where id = ?",
        [cliente.email, cliente.nombre, cliente.activo, id],
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0){
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("modificar cliente: ",{id: id, ...cliente });
            result(null, {id: id, ...cliente});
        }
    );
};


Cliente.remove = (id, result) => {
    sql.query("delete from clientes where id = ?", id, (err, res) =>{
        if (err) {
            console.log("error: ",err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("cliente borrado con el id: ", id);
        result(null, res);
    });
};


Cliente.removeAll = result => {
    sql.query("delete from clientes", (err, res) => {
        if (err) {
            console.log("error: ",err);
            result(null, err);
            return;
        }

        console.log(`borrados ${res.affectedRows} clientes`);
        result(null, res);
    });
};

module.exports = Cliente;