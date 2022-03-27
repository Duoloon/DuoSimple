const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

class Proveedor extends Model {}
Proveedor.init({
    nombre:         {type: DataTypes.STRING, allowNull: true},
    direccion:      {type: DataTypes.STRING, allowNull: true},
    correo:         {type: DataTypes.STRING, allowNull: true},
    telefono:       {type: DataTypes.STRING, allowNull: true},
    rut:            {type: DataTypes.STRING, allowNull: true},
    bank:           {type: DataTypes.STRING, allowNull: true},
    notas:          {type: DataTypes.STRING, allowNull: true}
}, {
    sequelize,
    modelName: "Proveedor"
});

module.exports = Proveedor; 