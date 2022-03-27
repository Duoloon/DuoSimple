const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

const Proveedor = require('./proveedor')
const Product = require('./producto');
const Combo = require('./combo');

class Entrada extends Model {}
Entrada.init({
    date:          {type: DataTypes.DATE, allowNull: true},
    status:        {type: DataTypes.STRING, allowNull: true},
    nota:          {type: DataTypes.STRING, allowNull: true}
}, {
    sequelize,
    modelName: "Entrada"
});

Entrada.belongsTo(Proveedor);
Proveedor.hasMany(Entrada);


module.exports = Entrada; 