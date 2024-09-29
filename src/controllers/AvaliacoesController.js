// Os usuários podem votar em locais para atividade física de 0 a 5 (variando de 0,5 em 0,5) e deixar feedback, mas não podem votar em seus próprios locais para atividade física.
class AvaliacoesController {
  async criarAvaliacao(request, response) {
    const { idLocal, nota, feedback } = request.body;
    // Lógica para criar uma avaliação
  }

  async listarAvaliacoes(req, res) {
    const { localId } = req.params;
    // Lógica para listar avaliações de um local específico
  }
}

module.exports = AvaliacoesController;
