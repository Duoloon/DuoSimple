const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../../database/index');

const Salida = require('../salida');
const Combo = require('../combo');

class Salida_Combo extends Model {}
Salida_Combo.init({
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
    modelName: "Salida_Combo"
});


Salida.belongsToMany(Combo, { through: 'Salida_Combo' });
Combo.belongsToMany(Salida, { through: 'Salida_Combo' });

module.exports = Salida_Combo; 