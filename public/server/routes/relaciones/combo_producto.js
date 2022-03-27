const { Router } = require('express');

const {
    test,
    list,
    getOne,
    update,
    create,
    deleteOne
} = require('../../controllers/relaciones/combo_producto');

const router = Router();

router.get(     '/test' , test);
router.get(     '/'     , list);
router.get(     '/:id'  , getOne);
router.post(    '/'     , create);
router.put(     '/:id'  , update);
router.delete(     '/:id'  , deleteOne);


module.exports = router;