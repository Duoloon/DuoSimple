const { Router } = require('express');

const Clientes = require('../models/cliente');
const Proveedor = require('../models/proveedor');
const Producto = require('../models/producto');
const Combo = require('../models/combo');
const Combo_Producto = require('../models/Relaciones/combo_productos');
const Inventario = require('../models/inventario')

const router = Router();

router.get('/' , async (req,res) => {

    if(req.body.sync){
        await Clientes.sync({ force: true });
        await Proveedor.sync({ force: true });
        await Producto.sync({ force: true });
        await Combo.sync({ force: true });
        await Combo_Producto.sync({ force: true });
    }
    if(req.body.drop){
        await Clientes.truncate();
        await Proveedor.truncate();
        await Producto.truncate();
        await Combo.truncate();
        await Combo_Producto.truncate();
      }
      if(req.body.seed){
      await Clientes.bulkCreate([
        {
          nombre      : "ramon",
          direccion   : "calle 1",
          correo      : "ramon@ramon.com",
          telefono    : "+56999988874",
          rut         : "99.999.999-9",
          notas       : "Sin Notas"
        },
        {
          nombre      : "Jose",
          direccion   : "calle 2",
          correo      : "jose@jose.com",
          telefono    : "+56955588741",
          rut         : "88.888.888-8",
          notas       : "nada que agregar"
        },
        {
          nombre      : "maria",
          direccion   : "calle 3",
          correo      : "maria@maria.com",
          telefono    : "+56911188800",
          rut         : "11.111.111-1",
          notas       : "no aplica"
        }
      ])
      await Proveedor.bulkCreate([
        {
          nombre      : "Stark",
          direccion   : "avenida 1",
          correo      : "Stark@Stark.com",
          telefono    : "+5695555574",
          rut         : "55.555.555-5",
          notas       : "buena tecnologia"
        },
        {
          nombre      : "umbrella",
          direccion   : "avenida 2",
          correo      : "umbrella@umbrella.com",
          telefono    : "+56933333331",
          rut         : "33.333.333-3",
          notas       : "virus"
        },
        {
          nombre      : "china",
          direccion   : "avenida 3",
          correo      : "china@china.com",
          telefono    : "+5691000000",
          rut         : "22.222.222-2",
          notas       : "demora"
        }
      ])
      await Producto.bulkCreate([
        {
          sku           : "FE34GT4",
          nombre        : "Limpia contacto",
          codebar       : "4056807871295",
          descripcion   : "limpia contactos wurth",
          unidad        : "unidad",
          precio        : "3000"
        },
        {
          sku           : "DTF433FG",
          nombre        : "Clips",
          codebar       : "7806505040809",
          descripcion   : "caja de Clips 100 unidades",
          unidad        : "caja",
          precio        : "2500"
        },
        {
          sku           : "QWR34RFD",
          nombre        : "WD-40",
          codebar       : "079567520054",
          descripcion   : "WD-40 wurth",
          unidad        : "unidad",
          precio        : "5000"
        }
      ])
      await Combo.bulkCreate([
        {
          sku           : "FE34GT42",
          nombre        : "caja de Limpia contacto",
          codebar       : "",
          descripcion   : "caja de Limpia contacto",
          unidad        : "unidad",
          precio        : "3000"
        },
        {
          sku           : "DTF433FG2",
          nombre        : "Limpia contacto + WD-40",
          codebar       : "",
          descripcion   : "Limpia contacto + WD-40",
          unidad        : "caja",
          precio        : "2500"
        },
        {
          sku           : "QWR34RFD2",
          nombre        : "caja de WD-40",
          codebar       : "",
          descripcion   : "caja de WD-40",
          unidad        : "unidad",
          precio        : "5000"
        }
      ])  
      const combos = await Combo.findAll()
      const productos = await Producto.findAll()
      await Combo_Producto.bulkCreate([
    {
      cantidad    : 12,
	    ComboId     : combos[0].id,
	    ProductoId  : productos[0].id
    },
    {
      cantidad    : 1,
	    ComboId     : combos[1].id,
	    ProductoId  : productos[0].id
    },
    {
      cantidad    : 1,
	    ComboId     : combos[1].id,
	    ProductoId  : productos[2].id
    },
    {
      cantidad    : 12,
	    ComboId     : combos[2].id,
	    ProductoId  : productos[2].id
    }
      ])
      await Producto.findAll({
        where:{
          sku: "FE34GT4"
        }
      }).then(async function (data){
        console.log(data[0].id)
        await Inventario.create({
          ProductoId  : data[0].id,
          stock       : 0,
          entradasStock : "",
          entradasValor : "",
          salidasStock  : "",
          salidasValor  : ""
        }) 
      })
      await Producto.findAll({
        where:{
          sku: "DTF433FG"
        }
      }).then(async function (data){
        await Inventario.create({
          ProductoId  : data[0].id,
          stock       : 0,
          entradasStock : "",
          entradasValor : "",
          salidasStock  : "",
          salidasValor  : ""
        }) 
      })
      await Producto.findAll({
        where:{
          sku: "QWR34RFD"
        }
      }).then(async function (data){
        await Inventario.create({
          ProductoId  : data[0].id,
          stock       : 0,
          entradasStock : "",
          entradasValor : "",
          salidasStock  : "",
          salidasValor  : ""
        }) 
      })

    }

    const response = { success: true, data: "db" }

    res.json(response);
});


module.exports = router;