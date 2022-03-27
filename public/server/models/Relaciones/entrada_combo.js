const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../../database/index');

const Entrada = require('../entrada');
const Combo = require('../combo');

class Entrada_Combo extends Model {}
Entrada_Combo.init({
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
    modelName: "Entrada_Combo"
});


Entrada.belongsToMany(Combo, { through: 'Entrada_Combo' });
Combo.belongsToMany(Entrada, { through: 'Entrada_Combo' });

module.exports = Entrada_Combo; 