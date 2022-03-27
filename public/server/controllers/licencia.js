const Licencia = require('../models/licencia');
const axios = require('axios');

const test = async (req, res) => {
  if (req.body.sync) {
    await Licencia.sync()
  }
  if (req.body.drop) {
    await Licencia.truncate()
  }

  const response = { success: true, data: 'Licencia' }

  res.json(response)
}

const list = async (req, res) => {
  const response = await Licencia.findAll()
    .then(async function (data) {
      //consumir api wp

      let peticion;

      if(data[0].licenseKey===null){
        peticion = 'no hay licencia registrada'
      }else{
        peticion = await axios.get(
          `https://duoloon.com/wp-json/lmfwc/v2/licenses/${data[0].licenseKey}`, 
          {
          auth: {
            username: 'ck_bcf5f84bf485b361702e54000338a3e825e3beb7',
            password: 'cs_00b3bc7469a28ad04029c077b046bcab80e285a9'
          }
        });
      }

      const res = { success: true, data: data, message: peticion.data }
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

    const licencias = await Licencia.findAll()

    if(licencias.length==0){
      const response = await Licencia.create({
        licenseKey: req.body.licenseKey
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
    }else{
      const actualizar = {
        success: true,
        data: licencias,
        message: 'Utilice actualizar'
      }
      return res.json(actualizar)
    }
    
  } catch (e) {
    console.log(e)
  }
}

const update = async (req, res) => {
  try {

    const response = await Licencia.update(
      {
        licenseKey: req.body.licenseKey
      },
      {
        where: { id: 1 }
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

const deleteOne = async (req, res) => {
  try {

    const response = await Licencia.update(
      {
        licenseKey: null
      },
      {
        where: { id: 1 }
      }
    )
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
  deleteOne 
}
