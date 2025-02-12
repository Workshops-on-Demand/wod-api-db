import express from 'express';
import models from '../models';
const { authJwt, verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

const router = express.Router();

// Get users
router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  models.user
    .findAll({
      raw: true,
      order: [['id', 'ASC']],
    })
    .then((entries) => res.send(entries));
});

// Get user by ID
router.get('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  models.user
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send('User Not Found');
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

router.post(
  '/user',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controller.signup
);

// Edit user
router.put('/user/:id', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  models.user
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

// Delete user
router.delete(
  '/user/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    models.user
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
