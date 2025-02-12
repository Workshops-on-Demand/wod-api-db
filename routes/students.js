import express from 'express';
import models from '../models';
const { authJwt } = require('../middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

// Create a Student
/**
 * @swagger
 * path:
 *  /student:
 *    post:
 *      summary: Create a new student
 *      tags: [Students]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      responses:
 *        "200":
 *          description: A student schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 */
router.post('/student', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  models.student
    .create({ ...req.body, createdAt: new Date(), updatedAt: new Date() })
    .then(({ dataValues }) => res.status(200).send(dataValues))
    .catch((error) => {
      res.status(400).send({ error });
    });
});

/**
 * @swagger
 * path:
 *  /students:
 *    get:
 *      summary: Returns a list of jupyterhub students.
 *      tags: [Students]
 *      responses:
 *        "200":
 *          description: A JSON array of student objects
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 */
// Get students
router.get('/students', [authJwt.verifyToken], (req, res) => {
  models.student
    .findAll({
      raw: true,
      order: [['id', 'ASC']],
    })
    .then((entries) => res.send(entries));
});

/**
 * @swagger
 * path:
 *  /students/{studentId}:
 *    get:
 *      summary: Get a student by ID.
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: studentId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the jupyterhub student
 *      responses:
 *        "200":
 *          description: An student object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 */
// Get student by ID
router.get('/students/:id', [authJwt.verifyToken], (req, res) => {
  models.student
    .findOne({
      where: { id: req.params.id },
    })
    .then((entry) => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send('Student Not Found');
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

/**
 * @swagger
 * path:
 *  /student/{studentId}:
 *    put:
 *      summary: Update a student by ID.
 *      tags: [Students]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      parameters:
 *        - in: path
 *          name: studentId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the student
 *      responses:
 *        "200":
 *          description: A Student object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 */
// Edit student
router.put(
  '/student/:id',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  (req, res) => {
    models.student
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
  }
);

/**
 * @swagger
 * path:
 *  /student/{studentId}:
 *    delete:
 *      summary: Delete a student by ID.
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: studentId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Id of the student
 *      responses:
 *        "200":
 *          description: A Student object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 */

// Delete student
router.delete(
  '/student/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    models.student
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
