import express from 'express';

const controller = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', controller.signin);

export default router;
