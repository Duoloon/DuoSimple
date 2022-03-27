const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

class Producto extends Model {}
Producto.init({
    sku:                {type: DataTypes.STRING, allowNull: true},
    nombre:             {type: DataTypes.STRING, allowNull: true},
    codebar:            {type: DataTypes.STRING, allowNull: true},
    descripcion:        {type: DataTypes.STRING, allowNull: true},
    unidad:             {type: DataTypes.STRING, allowNull: true},
    precio:             {type: DataTypes.REAL, allowNull: true,defaultValue: 0}
}, {
    sequelize,
    modelName: "Producto"
});

module.exports = Producto; 