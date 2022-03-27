const { Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database/index');


class Licencia extends Model {}
Licencia.init({
    licenseKey:        {type: DataTypes.STRING, allowNull: true}
}, {
    sequelize,
    modelName: "Licencia"
});



module.exports = Licencia; 