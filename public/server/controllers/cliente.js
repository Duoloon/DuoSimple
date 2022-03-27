const Clientes = require('../models/cliente')

const test = async (req, res) => {
  if (req.body.sync) {
    await Clientes.sync()
  }
  if (req.body.drop) {
    await Clientes.truncate()
  }
  if (req.body.seed) {
    const response = await Clientes.bulkCreate([
      {
        nombre: 'ramon',
        direccion: 'calle 1',
        correo: 'ramon@ramon.com',
        telefono: '+56999988874',
        rut: '99.999.999-9',
        notas: 'Sin Notas'
      },
      {
        nombre: 'Jose',
        direccion: 'calle 2',
        correo: 'jose@jose.com',
        telefono: '+56955588741',
        rut: '88.888.888-8',
        notas: 'nada que agregar'
      },
      {
        nombre: 'maria',
        direccion: 'calle 3',
        correo: 'maria@maria.com',
        telefono: '+56911188800',
        rut: '11.111.111-1',
        notas: 'no aplica'
      }
    ])
  }

  const response = { success: true, data: 'clientes' }

  res.json(response)
}

const list = async (req, res) => {
  const response = await Clientes.findAll()
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
    const response = await Clientes.create({
      nombre: req.body.nombre,
      direccion: req.body.direccion,
      correo: req.body.correo,
      telefono: req.body.telefono,
      rut: req.body.rut,
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
    const response = await Clientes.bulkCreate(req.body.data)
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

    const response = await Clientes.update(
      {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        rut: req.body.rut,
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

    const response = await Clientes.findAll({
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

    const response = await Clientes.destroy({
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
