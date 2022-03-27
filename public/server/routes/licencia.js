const { Router } = require('express');

const {
    test,
    list,
    create,
    update,
    deleteOne
} = require('../controllers/licencia');

const router = Router();

router.get(     '/test' , test);
router.get(     '/'     , list);
router.post(    '/'     , create);
router.put(     '/'  , update);
router.delete(  '/'  , deleteOne);


module.exports = router;