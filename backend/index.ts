import express from 'express';
import exampleRoutes from './src/routes/exampleRoutes';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Define API routes
app.use('/api', exampleRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
