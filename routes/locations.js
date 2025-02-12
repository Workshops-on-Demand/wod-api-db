import express from 'express';
import models from '../models';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Location management
 */

/**
 * @swagger
 * path:
 *  /locations:
 *    get:
 *      summary: Returns a list of locations.
 *      tags: [Locations]
 *      responses:
 *        "200":
 *          description: A JSON array of locations objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Location'
 */
// Get locations
router.get('/locations', (req, res) => {
  models.location
    .findAll({
      raw: true,
      order: [['id', 'ASC']],
    })
    .then((entries) => res.send(entries));
});

// Get location by ID
router.get('/location/:id', (req, res) => {
  models.location
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send('Location Not Found');
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

// Edit location
router.put('/location/:id', (req, res) => {
  models.location
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      entry
        .update({ ...req.body })
        .then(({ dataValues }) => res.status(200).send(dataValues));
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

// Delete location
router.delete(
  '/location/:id',
  (req, res) => {
    models.location
      .findOne({
        where: { id: req.params.id },
      })
      .then((entry) => {
        entry.destroy().then(() => res.status(200).send({}));
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  }
);

export default router;
