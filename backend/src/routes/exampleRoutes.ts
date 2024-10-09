import express from 'express';
import exampleController from '../controllers/exampleController';

const router = express.Router();

// Define routes
router.get('/items', exampleController.getAll);
router.post('/items', exampleController.create);

export default router;
