import express from "express";
import models from "../models/";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SpecialBadges
 *   description: Hackshack special badges
 */

// Get special badges
/**
 * @swagger
 * path:
 *  /special-badges:
 *    get:
 *      summary: Returns a list of special badges.
 *      tags: [SpecialBadges]
 *      responses:
 *        "200":
 *          description: A JSON array of replay objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SpecialBadges'
 */
router.get("/special-badges", (req, res) => {
  models.special_badge
    .findAll({
      order: [["id", "ASC"]]
    })
    .then(entries => {
      (res.send(entries))
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

export default router;