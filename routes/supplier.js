const express = require('express');
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');

router.get('/suppliers', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.suppliers.getAll);
router.get('/suppliers/:id_supplier', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, false), rbac.suppliers.getId);
router.post('/suppliers', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true, false, false), rbac.suppliers.create);
router.put('/suppliers/:id_supplier', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, true, false), rbac.suppliers.update);
router.delete('/suppliers/:id_supplier', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false, false, true), rbac.suppliers.destroy);

module.exports = router;