import { Request, Response } from 'express';

// Example controller
const exampleController = {
    getAll: (req: Request, res: Response): void => {
        res.json({ message: 'Retrieve all items' });
    },
    create: (req: Request, res: Response): void => {
        const newItem = req.body; // Define the shape of newItem if needed
        res.status(201).json({ message: 'Item created', item: newItem });
    }
};

export default exampleController;