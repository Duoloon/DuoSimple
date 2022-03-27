const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../../database/index');

const Salida = require('../salida');
const Product = require('../producto');

class Salida_Producto extends Model {}
Salida_Producto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidad:           {type: DataTypes.NUMBER, allowNull: true},
    valornetounitario:  {type: DataTypes.REAL, allowNull: true},
    valortotalunitario: {type: DataTypes.REAL, allowNull: true},
    valornetocantidad:  {type: DataTypes.REAL, allowNull: true},
    valortotalcantidad: {type: DataTypes.REAL, allowNull: true},
    estatus:            {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true}
}, {
    sequelize,
    modelName: "Salida_Producto"
});


Salida.belongsToMany(Product, { through: 'Salida_Producto' });
Product.belongsToMany(Salida, { through: 'Salida_Producto' });

module.exports = Salida_Producto; 