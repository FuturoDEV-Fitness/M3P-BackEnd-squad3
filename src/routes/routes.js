const { Router } = require("express");

const SwaggerUI = requeire("swagger-ui-express");
const swaggerDocument = require("/doc.swagger.json");

const usuariosRoutes = require("./usuarios.routes.js");
const loginRoutes = require("./login.routes.js");
const locaisRoutes = require("./locais.routes.js");

const router = Router();

router.use("/usuarios", usuariosRoutes);
router.use("/login", loginRoutes);
router.use("/locais", locaisRoutes);
module.exports = router;
