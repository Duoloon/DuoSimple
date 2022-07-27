const Ventas = require('../models/venta')
const Venta_Producto = require('../models/Relaciones/venta_producto')
const Cliente = require('../models/cliente')
const Producto = require('../models/producto')

const test = async (req, res) => {
  const response = { success: true, data: 'Ventas' }
  res.json(response)
}

const list = async (req, res) => {
  const response = await Ventas.findAll({
    include: {
     model: Producto
   }
   })
    .then(function (data) {
      const res = { success: true, data: data }
      return res
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res
    })
  res.json(response)
}

const create = async (req, res) => {
  try {
    const response = await Ventas.create({
      iva: req.body.iva,
      sub_total: req.body.sub_total,
      total: req.body.total,
      descuento: req.body.descuento,
      tasa: req.body.tasa,
      metodo_de_pago: req.body.metodo_de_pago,
      ClienteId: req.body.cliente
    })
      .then(async function (data) {
        try {
          for (let i = 0; i < req.body.productos.length; i++) {
            const response = await Venta_Producto.create({
              VentaId: data.id,
              ProductoId: req.body.productos[i].id,
              cantidad: req.body.productos[i].cantidad,
              valortotalunitario: req.body.productos[i].precio
            })
          }
          const res = {
            success: true,
            data: data,
            message: 'Venta creada exitosamente'
          }
          return res
        } catch (e) {
          const res = { success: false, error: e }
          return res
        }
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

const insertData = async (req, res) => {
  try {
    if (req.body.data) {
      const response = await Ventas.bulkCreate(req.body.data)
        .then(function (data) {
          const res = { success: true, data: data }
          return res
        })
        .catch(error => {
          const res = { success: false, error: error }
          return res
        })
      const ress = { success: true, data: data, message: 'creado exitosamente' }
      return res.json(ress)
    }
    const ress = { success: false, message: 'No se envió la data' }
    return res.json(ress)
  } catch (e) {
    console.log(e)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Ventas.update(
      {
        iva: req.body.iva,
        sub_total: req.body.sub_total,
        total: req.body.total,
        descuento: req.body.descuento,
        tasa: req.body.tasa,
        metodo_de_pago: req.body.metodo_de_pago
      },
      {
        where: { id: id }
      }
    )
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: 'actualizado exitosamente'
        }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

const getOne = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Ventas.findAll({
      where: { id: id }
    })
      .then(function (data) {
        const res = { success: true, data: data }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params
    await Venta_Producto.destroy({
      where: { VentaId: id }
    })

    const response = await Ventas.destroy({
      where: { id: id }
    })
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: 'borrado exitosamente'
        }
        return res
      })
      .catch(error => {
        const res = { success: false, error: error }
        return res
      })
    res.json(response)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  test,
  list,
  create,
  update,
  getOne,
  deleteOne,
  insertData
}
