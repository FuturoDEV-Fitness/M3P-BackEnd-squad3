const Rating = require('../models/Rating');
const Local = require('../models/Local');

class RatingController {
  async createRating(req, res) {
    const { locationId, userId, score, feedback } = req.body;

    try {
      const newRating = await Rating.create({
        locationId,
        userId,
        score,
        feedback,
      });

      return res.status(201).json(newRating);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao criar avaliação' });
    }
  }

  async getRatingsByLocation(req, res) {
    const { locationId } = req.params;

    try {
      const ratings = await Rating.findAll({
        where: { locationId },
        include: [{
          model: Local,
          attributes: ['name', 'description'], // Incluir atributos do modelo Local, se necessário
        }],
      });

      return res.status(200).json(ratings);
    } catch (error) {
      return res.status(500).json({ error: 'Falha ao buscar avaliações' });
    }
  }
}

module.exports = new RatingController();