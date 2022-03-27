const Producto = require('../models/producto')
const Inventario = require('../models/inventario')

const test = async (req, res) => {
  if (req.body.sync) {
    await Producto.sync()
  }
  if (req.body.drop) {
    await Producto.truncate()
  }
  if (req.body.seed) {
    await Producto.bulkCreate([
      {
        sku: 'FE34GT4',
        nombre: 'Limpia contacto',
        codebar: '4056807871295',
        descripcion: 'limpia contactos wurth',
        unidad: 'unidad',
        precio: '3000'
      },
      {
        sku: 'DTF433FG',
        nombre: 'Clips',
        codebar: '7806505040809',
        descripcion: 'caja de Clips 100 unidades',
        unidad: 'caja',
        precio: '2500'
      },
      {
        sku: 'QWR34RFD',
        nombre: 'WD-40',
        codebar: '079567520054',
        descripcion: 'WD-40 wurth',
        unidad: 'unidad',
        precio: '5000'
      }
    ])
    await Producto.findAll({
      where: {
        sku: 'FE34GT4'
      }
    }).then(async function (data) {
      console.log(data[0].id)
      await Inventario.create({
        ProductoId: data[0].id,
        stock: 0,
        entradasStock: '',
        entradasValor: '',
        salidasStock: '',
        salidasValor: ''
      })
    })
    await Producto.findAll({
      where: {
        sku: 'DTF433FG'
      }
    }).then(async function (data) {
      await Inventario.create({
        ProductoId: data[0].id,
        stock: 0,
        entradasStock: '',
        entradasValor: '',
        salidasStock: '',
        salidasValor: ''
      })
    })
    await Producto.findAll({
      where: {
        sku: 'QWR34RFD'
      }
    }).then(async function (data) {
      await Inventario.create({
        ProductoId: data[0].id,
        stock: 0,
        entradasStock: '',
        entradasValor: '',
        salidasStock: '',
        salidasValor: ''
      })
    })
  }

  const response = { success: true, data: 'producto' }

  res.json(response)
}

const list = async (req, res) => {
  const response = await Producto.findAll()
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
    const response = await Producto.create({
      nombre: req.body.nombre,
      sku: req.body.sku,
      codebar: req.body.codebar,
      descripcion: req.body.descripcion,
      unidad: req.body.unidad,
      precio: req.body.precio
    })
      .then(async function (data) {
        await Inventario.create({
          ProductoId: data.id,
          stock: 0,
          entradasStock: '',
          entradasValor: '',
          salidasStock: '',
          salidasValor: ''
        })

        const res = {
          success: true,
          data: data,
          message: 'creado exitosamente'
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

const insertData = async (req, res) => {
  try {
    const response = await Producto.bulkCreate(req.body.data)
    const ress = { success: true, data: data, message: 'creado exitosamente' }
    return res.json(ress)
  } catch (e) {
    const ress = { success: false, error: "ocurrio un error" }
    res.json(ress)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params

    const response = await Producto.update(
      {
        nombre: req.body.nombre,
        sku: req.body.sku,
        codebar: req.body.codebar,
        descripcion: req.body.descripcion,
        unidad: req.body.unidad,
        precio: req.body.precio
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

    const response = await Producto.findAll({
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

    const response = await Producto.destroy({
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
