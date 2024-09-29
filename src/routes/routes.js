const { Router } = require("express");

const SwaggerUI = requeire("swagger-ui-express");
const swaggerDocument = require("/doc.swagger.json");

const usuarioRoutes = require("./usuarios.routes.js");
const autenticUsuarioRoutes = require("./autentic.usuario.routes.js");
const locaisRoutes = require("./locais.routes.js");

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/", autenticUsuarioRoutes);
router.use("/locais", locaisRoutes);

module.exports = router;
