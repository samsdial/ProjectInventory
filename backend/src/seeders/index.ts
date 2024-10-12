import mongoose from 'mongoose';

import { connectDB } from '../db';
import seedUsers from './users';   // Import user seeder

const runSeeders = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Run the individual seeders one by one
    console.log('Seeding users...');
    await seedUsers();

    console.log('Seeding products...');
    //await seedProducts();

    console.log('Seeding orders...');
    //await seedOrders();

    console.log('All seeders ran successfully!');
  } catch (err) {
    console.error('Error running seeders:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

runSeeders();
