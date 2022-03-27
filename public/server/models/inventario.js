const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

const Product = require('./producto');

class Inventario extends Model {}
Inventario.init({
    stock:                  {type: DataTypes.REAL, allowNull: true},
    entradasStock:          {type: DataTypes.STRING, allowNull: true},
    entradasValor:          {type: DataTypes.STRING, allowNull: true},
    entradasFechas:         {type: DataTypes.STRING, allowNull: true},
    salidasStock:           {type: DataTypes.STRING, allowNull: true},
    salidasValor:           {type: DataTypes.STRING, allowNull: true},
    status:                 {type: DataTypes.BOOLEAN, allowNull: true},
    salidasFechas:          {type: DataTypes.STRING, allowNull: true},
}, {
    sequelize,
    modelName: "Inventario"
});

Inventario.belongsTo(Product);
Product.hasMany(Inventario);

module.exports = Inventario; 