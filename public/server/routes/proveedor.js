const { Router } = require('express');

const {
    test,
    list,
    create,
    update,
    getOne,
    deleteOne,
    insertData
} = require('../controllers/proveedor');

const router = Router();

router.get(     '/test' , test);
router.get(     '/'     , list);
router.get(     '/:id'  , getOne);
router.post(    '/'     , create);
router.post(    '/excel'     , insertData);
router.put(     '/:id'  , update);
router.delete(  '/:id'  , deleteOne);


module.exports = router;