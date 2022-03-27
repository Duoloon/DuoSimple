const Proveedor = require('../models/proveedor')

const test = async (req, res) => {
  if (req.body.sync) {
    await Proveedor.sync()
  }
  if (req.body.drop) {
    await Proveedor.truncate()
  }
  if (req.body.seed) {
    const response = await Proveedor.bulkCreate([
      {
        nombre: 'Stark',
        direccion: 'avenida 1',
        correo: 'Stark@Stark.com',
        telefono: '+5695555574',
        rut: '55.555.555-5',
        notas: 'buena tecnologia'
      },
      {
        nombre: 'umbrella',
        direccion: 'avenida 2',
        correo: 'umbrella@umbrella.com',
        telefono: '+56933333331',
        rut: '33.333.333-3',
        notas: 'virus'
      },
      {
        nombre: 'china',
        direccion: 'avenida 3',
        correo: 'china@china.com',
        telefono: '+5691000000',
        rut: '22.222.222-2',
        notas: 'demora'
      }
    ])
  }

  const response = { success: true, data: 'proveedor' }

  res.json(response)
}

const list = async (req, res) => {
  const response = await Proveedor.findAll()
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
    const response = await Proveedor.create({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      correo: req.body.correo,
      telefono: req.body.telefono,
      rut: req.body.rut,
      bank: req.body.bank,
      notas: req.body.notas
    })
      .then(function (data) {
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
    const response = await Proveedor.bulkCreate(req.body.data)
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

    const response = await Proveedor.update(
      {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        rut: req.body.rut,
        bank: req.body.bank,
        notas: req.body.notas
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

    const response = await Proveedor.findAll({
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

    const response = await Proveedor.destroy({
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
