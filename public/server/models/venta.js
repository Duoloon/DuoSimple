const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../database/index')

const Cliente = require('./cliente')

class Venta extends Model {}
Venta.init(
  {
    iva: { type: DataTypes.REAL, allowNull: true },
    sub_total: { type: DataTypes.REAL, allowNull: true },
    total: { type: DataTypes.REAL, allowNull: true },
    descuento: { type: DataTypes.REAL, allowNull: true },
    tasa: { type: DataTypes.REAL, allowNull: true },
    metodo_de_pago: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Ventas'
  }
)
Venta.belongsTo(Cliente)

module.exports = Venta
