const Entrada = require('../models/entrada');
const Combo = require('../models/combo');
const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');
const Entrada_Producto = require('../models/Relaciones/entrada_producto');
const Entrada_Combo = require('../models/Relaciones/entrada_combo');
const Inventario = require('../models/inventario')

const test = async (req,res) => {

  if(req.body.sync){
    await Inventario.sync({ force: true });
  }

    const response = { success: true, data: "inventario" }

  res.json(response);
};

const list = async (req, res) => {

  //return res.json("hola")

  const response = await Inventario.findAll({
   include: {
    model: Producto
  }
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

    const {proveedor,productos,combo} = req.body;

    const response = await Entrada.create({
      date            : req.body.date,
      status          : req.body.status,
      nota            : req.body.nota
    })
    .then(async function(data){

      if(proveedor){
        const rproveedor = await data.setProveedor(proveedor)
      }
      //ingresa productos
      if(productos && productos.length > 0){
        let arrpid=[];
        let arrpcantidad=[];
        productos.forEach(producto => {
          arrpid.push(producto.id)
          arrpcantidad.push(producto.cantidad)
        });
        const relacion = await data.addProducto(arrpid)
        for(let i=0; i < relacion.length; i++) {
          arrpcantidad[i]
            const response = await Entrada_Producto.update({
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
        const response = await Entrada_Combo.create({
          cantidad        : arrccantidad[j],
          EntradaId       : data.id,
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
    const {producto,stock,status} = req.body; 

    const response = await Inventario.update({
      ProductoId      : producto,
      stock           : stock,
      status          : status
    },{
      where: { id: id}
    })
    .then(async function(data){
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

    const response = await Inventario.findAll({
      where: { id: id},
      include: {
        model: Producto
      }
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

    const response = await Inventario.destroy({
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