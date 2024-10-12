import express from 'express';

import { connectDB } from './src/db'; 
import authRoutes from './src/routes/authentication';

const app = express();
app.use(express.json());
connectDB();

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
