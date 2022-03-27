const Salida = require('../models/salida');
const Combo = require('../models/combo');
const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');
const Cliente = require('../models/cliente');
const Salida_Producto = require('../models/Relaciones/salida_producto');
const Salida_Combo = require('../models/Relaciones/salida_combo');
const Inventario = require('../models/inventario');


const test = async (req,res) => {

    const response = { success: true, data: "Salidas a inventario" }

  res.json(response);
};

const list = async (req, res) => {

  //return res.json("hola")

  const response = await Salida.findAll({
   include: [{
    model: Cliente,
  },{
    model: Producto
  },{
    model: Combo
  }
  ]
  })
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })
  res.json(response);

}

const create = async ( req, res) =>{ 

  try {

    const {cliente,productos,combo} = req.body;

    const response = await Salida.create({
      date            : req.body.date,
      status          : req.body.status,
      nota            : req.body.nota
    })
    .then(async function(data){

      if(cliente){
        const rcliente = await data.setCliente(cliente)
      }
      //ingresa productos
      if(productos && productos.length > 0){
        let arrpid=[];
        let arrpcantidad=[];
        productos.forEach(async producto => {
          arrpid.push(producto.id)
          arrpcantidad.push(producto.cantidad)

          //modificar inventario
          let productodata = await Producto.findOne({where:{id:producto.id}})
          let cantidadInventario = await Inventario.findOne({where:{ProductoId:producto.id}})
          cantidadInventario.stock -= producto.cantidad
          const salidasstockstring = cantidadInventario.salidasStock;
          const salidasvalorstring = cantidadInventario.salidasValor;
          let salidasstock=[];
          let salidasvalor=[];
          if(salidasstockstring!=""){
            salidasstock = salidasstockstring.split(",");
            salidasvalor = salidasvalorstring.split(",");
          }
          if (salidasstock.length<10){
            salidasstock.push(producto.cantidad);
            salidasvalor.push(productodata.precio * producto.cantidad);
          }else{
            salidasstock.push(producto.cantidad);
            salidasvalor.push(productodata.precio * producto.cantidad);
            salidasstock.shift()
            salidasvalor.shift()
          }
          const salidassstring = salidasstock.toString();
          const salidasvstring = salidasvalor.toString()
          await Inventario.update({
            stock: cantidadInventario.stock,
            salidasStock   : salidassstring,
            salidasValor   : salidasvstring 
          },{
            where:{ProductoId:producto.id}
          })
          //termina inventario

        });
        const relacion = await data.addProducto(arrpid)
        for(let i=0; i < relacion.length; i++) {
          arrpcantidad[i]
            const response = await Salida_Producto.update({
            cantidad      : arrpcantidad[i],
            },{
              where: { id: relacion[i].id}
            })
        }
      }
      //ingresa combos
      if(combo && combo.length > 0){
        let arrcid=[];
        let arrccantidad=[];
        combo.forEach(comb => {
          arrcid.push(comb.id)
          arrccantidad.push(comb.cantidad)
        });
        console.log(arrcid)
        console.log(arrccantidad)

        for(let j=0; j < combo.length; j++) {
        const response = await Salida_Combo.create({
          cantidad        : arrccantidad[j],
          SalidaId        : data.id,
          ComboId         : arrcid[j]
        })
        }

      }

      const res = { success: true, data: data, message:"creado exitosamente" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })

    res.json(response);

  } catch (e) {
    console.log(e);
    res.json(e)
  }
}

const update = async ( req, res) =>{

  try {

    const { id } = req.params;
    const {productos,combo} = req.body; 

    const response = await Salida.update({
      date            : req.body.date,
      status          : req.body.status,
      nota            : req.body.nota
    },{
      where: { id: id}
    })
    .then(async function(data){
      const salida = await Salida.findAll({
        where: { id: id}
      })
      //actualizar productos
      const salidaproductoarr = await Salida_Producto.findAll({
        where: { SalidaId: salida[0].id}
      })
      for(let i=0;i<productos.length;i++){
        let encontrado = false;
        for(let j =0; j<salidaproductoarr.length;j++){
          if(salidaproductoarr[j].ProductoId==productos[i].id){
            await Salida_Producto.update({
              cantidad      : productos[i].cantidad,
            },{
              where: { id: salidaproductoarr[j].id}
            })
            encontrado=true;
            break;
          }
        }
        if(!encontrado){
          const productexist = await Producto.findAll({
            where: { id: productos[i].id}
          })
          if(productexist.length>0){
            Salida_Producto.create({
              cantidad        : productos[i].cantidad,
              SalidaId       : salida[0].id,
              ProductoId      : productos[i].id
            })
          }
        }

      }
      //actualizar combos
      const salidacomboarr = await Salida_Combo.findAll({
        where: { SalidaId: salida[0].id}
      })
      for(let k=0;k<combo.length;k++){
        let encontradoc = false;
        for(let l =0; l<salidacomboarr.length;l++){
          if(salidacomboarr[l].ComboId==combo[k].id){
            await Salida_Combo.update({
              cantidad      : combo[k].cantidad,
            },{
              where: { id: salidacomboarr[l].id}
            })
            encontradoc=true;
            break;
          }
        }
        if(!encontradoc){
          const comboexist = await Combo.findAll({
            where: { id: combo[k].id}
          })
          if(comboexist.length>0){
            Salida_Combo.create({
              cantidad        : combo[k].cantidad,
              SalidaId       : salida[0].id,
              ComboId         : combo[k].id
            })
          }
        }

      }

      const res = { success: true, data: data, message:"actualizado exitosamente" }
      return res;
    })
    .catch(error=>{
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

const getOne = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Salida.findAll({
      where: { id: id},
      include: [{
        model: Proveedor,
      },{
        model: Producto
      },{
        model: Combo
      }
      ]
    })
    .then( function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}


const deleteOne = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Salida.destroy({
      where: { id: id }
    })
    .then( function(data){
      const res = { success: true, data: data, message:"borrado exitosamente" }
      return res;
    })
    .catch(error => {
      const res = { success: false, error: error }
      return res;
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

module.exports = {
    test,
    list,
    create,
    update,
    getOne,
    deleteOne
};