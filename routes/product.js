const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');

router.get('/products', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.products.getAll);
router.get('/products/:id_product', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.products.getId);
router.post('/products', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true, false, false), rbac.products.create);
router.put('/products/:id_product', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, true, false), rbac.products.update);
router.delete('/products/:id_product', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, true), rbac.products.destroy);

module.exports = router;