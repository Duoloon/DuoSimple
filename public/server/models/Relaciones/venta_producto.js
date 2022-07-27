const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../../database/index')

const Producto = require('../producto')
const Venta = require('../venta')

class Venta_Producto extends Model {}
Venta_Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    cantidad: { type: DataTypes.NUMBER, allowNull: true },
    valortotalunitario: {type: DataTypes.REAL, allowNull: true},
  },
  {
    sequelize,
    modelName: 'Ventas_Producto'
  }
)

Venta.belongsToMany(Producto, { through: 'Ventas_Producto' })
Producto.belongsToMany(Venta, { through: 'Ventas_Producto' })

module.exports = Venta_Producto
