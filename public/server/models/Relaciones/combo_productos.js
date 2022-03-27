const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../../database/index');

const Producto = require('../producto');
const Combo = require('../combo');

class Combo_Producto extends Model {}
Combo_Producto.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidad:           {type: DataTypes.NUMBER, allowNull: true},
    estatus:            {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true}
}, {
    sequelize,
    modelName: "Combo_Producto"
});

Combo.belongsToMany(Producto,{through:"Combo_Producto"});
Producto.belongsToMany(Combo,{through:"Combo_Producto"});


module.exports = Combo_Producto; 