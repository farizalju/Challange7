const express = require("express");
const router = express.Router();
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');


router.get('/components', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, false), rbac.components.getId);
router.get('/components/:id_component', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, false), rbac.components.getId);
router.post('/components', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, true, false, false), rbac.components.create);
router.put('/components/:id_component', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, true, false), rbac.components.update);
router.delete('/components/:id_component', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false, false, true), rbac.components.destroy);

module.exports = router;