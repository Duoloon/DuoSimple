const { Router } = require('express');

const {
    test,
    list,
    create,
    update,
    getOne,
    deleteOne
} = require('../controllers/salida');

const router = Router();

router.get(     '/test' , test);
router.get(     '/'     , list);
router.get(     '/:id'  , getOne);
router.post(    '/'     , create);
router.put(     '/:id'  , update);
router.delete(  '/:id'  , deleteOne);


module.exports = router;