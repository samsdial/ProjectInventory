import mongoose from 'mongoose';

import { connectDB } from '../db';

import seedCategories from './categories';
import seedUsers from './users';
import seedProducts from './products';
import seedTransactions from './transactions';
import seedWarehouses from './warehouses';

const runSeeders = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Run the individual seeders one by one
    console.log('Seeding users...');
    await seedUsers();

    console.log('Seeding categories...');
    await seedCategories();

    console.log('Seeding warehouses...\n');
    await seedWarehouses();

    console.log('Seeding products...');
    await seedProducts();

    console.log('Seeding transactions...');
    await seedTransactions();


    console.log('All seeders ran successfully!');
  } catch (err) {
    console.error('Error running seeders:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

runSeeders();
