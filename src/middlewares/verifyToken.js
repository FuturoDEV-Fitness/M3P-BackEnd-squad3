const { verify } = require("jsonwebtoken");

function verifyToken(request, response, next) {
  try {
    const authorizationHeader = request.headers.authorization;
    console.log(authorizationHeader);

    if (!authorizationHeader) {
      return response.status(400).json({
        mensagem: "Token ausente. Por favor, forneça um token válido.",
      });
    }

    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return response.status(400).json({
        mensagem: 'Formato do token inválido. Use o formato "Bearer {token}".',
      });
    }

    const result = verify(token, process.env.JWT_SECRET);

    request.idUsuario = result.id;

    next();
  } catch (error) {
    console.error("Server error: " + error);
    if (error.message === "jwt malformed" || error.message === "jwt expired") {
      return response
        .status(401)
        .json({ mensagem: "Token inválido ou expirado. Acesso negado." });
    } else {
      return response.status(500).json({
        mensagem: "Erro ao processar a requisição. Tente novamente mais tarde.",
      });
    }
  }
}

module.exports = verifyToken;
