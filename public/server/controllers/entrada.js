const Entrada = require('../models/entrada')
const Combo = require('../models/combo')
const Producto = require('../models/producto')
const Proveedor = require('../models/proveedor')
const Entrada_Producto = require('../models/Relaciones/entrada_producto')
const Entrada_Combo = require('../models/Relaciones/entrada_combo')
const Inventario = require('../models/inventario')

const test = async (req, res) => {
  if (req.body.sync) {
    await Entrada.sync({ force: true })
  }

  const response = { success: true, data: 'Entradas a inventario' }

  res.json(response)
}

const list = async (req, res) => {
  //return res.json("hola")

  const response = await Entrada.findAll({
    include: [
      {
        model: Proveedor
      },
      {
        model: Producto
      },
      {
        model: Combo
      }
    ]
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
    const { proveedor, productos, combo } = req.body

    const response = await Entrada.create({
      date: req.body.date,
      status: req.body.status,
      nota: req.body.nota
    })
      .then(async function (data) {
        if (proveedor) {
          const rproveedor = await data.setProveedor(proveedor)
        }
        //ingresa productos
        if (productos && productos.length > 0) {
          let arrpid = []
          let arrpcantidad = []
          productos.forEach(async producto => {
            arrpid.push(producto.id)
            arrpcantidad.push(producto.cantidad)

            //modificar inventario
            let productodata = await Producto.findOne({
              where: { id: producto.id }
            })
            let cantidadInventario = await Inventario.findOne({
              where: { ProductoId: producto.id }
            })
            cantidadInventario.stock += producto.cantidad
            const entradasstockstring = cantidadInventario.entradasStock
            const entradasvalorstring = cantidadInventario.entradasValor
            let entradasstock = []
            let entradasvalor = []
            if (entradasstockstring != '') {
              entradasstock = entradasstockstring.split(',')
              entradasvalor = entradasvalorstring.split(',')
            }
            if (entradasstock.length < 10) {
              entradasstock.push(producto.cantidad)
              entradasvalor.push(productodata.precio * producto.cantidad)
            } else {
              entradasstock.push(producto.cantidad)
              entradasvalor.push(productodata.precio * producto.cantidad)
              entradasstock.shift()
              entradasvalor.shift()
            }
            const entradassstring = entradasstock.toString()
            const entradasvstring = entradasvalor.toString()
            await Inventario.update(
              {
                stock: cantidadInventario.stock,
                entradasStock: entradassstring,
                entradasValor: entradasvstring
              },
              {
                where: { ProductoId: producto.id }
              }
            )
            //termina inventario
          })
          const relacion = await data.addProducto(arrpid)
          for (let i = 0; i < relacion.length; i++) {
            arrpcantidad[i]
            const response = await Entrada_Producto.update(
              {
                cantidad: arrpcantidad[i]
              },
              {
                where: { id: relacion[i].id }
              }
            )
          }
        }
        //ingresa combos
        if (combo && combo.length > 0) {
          let arrcid = []
          let arrccantidad = []
          combo.forEach(comb => {
            arrcid.push(comb.id)
            arrccantidad.push(comb.cantidad)
          })
          console.log(arrcid)
          console.log(arrccantidad)

          for (let j = 0; j < combo.length; j++) {
            const response = await Entrada_Combo.create({
              cantidad: arrccantidad[j],
              EntradaId: data.id,
              ComboId: arrcid[j]
            })
          }
        }

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
    res.json(e)
  }
}

const update = async (req, res) => {
  try {
    const { id } = req.params
    const { productos, combo } = req.body

    const response = await Entrada.update(
      {
        date: req.body.date,
        status: req.body.status,
        nota: req.body.nota
      },
      {
        where: { id: id }
      }
    )
      .then(async function (data) {
        const entrada = await Entrada.findAll({
          where: { id: id }
        })
        //actualizar productos
        const entradaproductoarr = await Entrada_Producto.findAll({
          where: { EntradaId: entrada[0].id }
        })
        for (let i = 0; i < productos.length; i++) {
          let encontrado = false
          for (let j = 0; j < entradaproductoarr.length; j++) {
            if (entradaproductoarr[j].ProductoId == productos[i].id) {
              await Entrada_Producto.update(
                {
                  cantidad: productos[i].cantidad
                },
                {
                  where: { id: entradaproductoarr[j].id }
                }
              )
              encontrado = true
              break
            }
          }
          if (!encontrado) {
            const productexist = await Producto.findAll({
              where: { id: productos[i].id }
            })
            if (productexist.length > 0) {
              Entrada_Producto.create({
                cantidad: productos[i].cantidad,
                EntradaId: entrada[0].id,
                ProductoId: productos[i].id
              })
            }
          }
        }
        //actualizar combos
        const entradacomboarr = await Entrada_Combo.findAll({
          where: { EntradaId: entrada[0].id }
        })
        for (let k = 0; k < combo.length; k++) {
          let encontradoc = false
          for (let l = 0; l < entradacomboarr.length; l++) {
            if (entradacomboarr[l].ComboId == combo[k].id) {
              await Entrada_Combo.update(
                {
                  cantidad: combo[k].cantidad
                },
                {
                  where: { id: entradacomboarr[l].id }
                }
              )
              encontradoc = true
              break
            }
          }
          if (!encontradoc) {
            const comboexist = await Combo.findAll({
              where: { id: combo[k].id }
            })
            if (comboexist.length > 0) {
              Entrada_Combo.create({
                cantidad: combo[k].cantidad,
                EntradaId: entrada[0].id,
                ComboId: combo[k].id
              })
            }
          }
        }

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

    const response = await Entrada.findAll({
      where: { id: id },
      include: [
        {
          model: Proveedor
        },
        {
          model: Producto
        },
        {
          model: Combo
        }
      ]
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

    const response = await Entrada.destroy({
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
  deleteOne
}
