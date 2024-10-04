const { Router } = require("express");

//const SwaggerUI = require("swagger-ui-express");
//const swaggerDocument = require("src/swagger/doc.swagger.json");

const verifyToken = require("../middlewares/verifyToken.js");

const usuarioRoutes = require("./usuarios.routes.js");
const autenticUsuarioRoutes = require("./autentic.usuario.routes.js");
const locaisRoutes = require("./locais.routes.js");
const ratingRoutes = require("./rating.routes.js");

const router = Router();

router.use("/usuarios", verifyToken, usuarioRoutes);
router.use("/autentic", autenticUsuarioRoutes);
router.use("/locais", verifyToken, locaisRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;