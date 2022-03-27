const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');


class Combo extends Model {}
Combo.init({
    sku:                {type: DataTypes.STRING, allowNull: true},
    nombre:             {type: DataTypes.STRING, allowNull: true},
    codebar:            {type: DataTypes.STRING, allowNull: true},
    descripcion:        {type: DataTypes.STRING, allowNull: true},
    unidad:             {type: DataTypes.STRING, allowNull: true},
    precio:             {type: DataTypes.REAL, allowNull: true}
}, {
    sequelize,
    modelName: "Combo"
});

//Combo.belongsToMany(Product,{through:"comboproductos"});
// Product.belongsTo(Combo);

module.exports = Combo; 