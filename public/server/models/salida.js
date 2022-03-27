const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');

const Cliente = require('./cliente')
const Product = require('./producto');
const Combo = require('./combo');

class Salida extends Model {}
Salida.init({
    date:          {type: DataTypes.DATE, allowNull: true},
    status:        {type: DataTypes.STRING, allowNull: true},
    nota:          {type: DataTypes.STRING, allowNull: true}
}, {
    sequelize,
    modelName: "Salida"
});

Salida.belongsTo(Cliente);
Cliente.hasMany(Salida);

module.exports = Salida; 