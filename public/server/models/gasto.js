const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

class Gasto extends Model {}
Gasto.init({
    date:           {type: DataTypes.DATE, allowNull: true},
    valor:          {type: DataTypes.REAL, allowNull: true},
    nombre:         {type: DataTypes.STRING, allowNull: true},
    nota:           {type: DataTypes.STRING, allowNull: true}
}, {
    sequelize,
    modelName: "Gasto"
});

module.exports = Gasto; 