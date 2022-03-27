const Combo_Producto = require('../../models/Relaciones/combo_productos');
const Producto = require('../../models/producto');
const Combo = require('../../models/combo');


const test = async (req,res) => {

    const response = { success: true, data: "Combo Productos" }

  res.json(response);
};

const list = async (req, res) => {

  const response = await Combo_Producto.findAll({
  
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

const getOne = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Combo_Producto.findAll({
      where: { id: id}
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

const update = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Combo_Producto.update({
        cantidad      : req.body.cantidad,
    },{
      where: { id: id}
    })
    .then(function(data){
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

const create = async ( req, res) =>{

  try {

    const response = await Combo_Producto.create({
        cantidad        : req.body.cantidad,
        ComboId         : req.body.ComboId,
        ProductoId      : req.body.ProductoId
    })
    .then(function(data){
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
  }
}

const deleteOne = async ( req, res) =>{

  try {

    const { id } = req.params;

    const response = await Combo_Producto.destroy({
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
    getOne,
    update,
    create,
    deleteOne
};