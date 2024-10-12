import mongoose from "mongoose";
import { connectDB } from '../db'; 
import { Transaction } from '../models';

const seedTransactions = async () => {
  const transactions = [
    {
      product_id: "650000000000000000000001",
      user_id: "60e9c5f4e8e7a4301c123456",
      create_at: new Date(),
      quantity_moved: 10,
      movement_type: 'in',
      description: 'Stock replenishment',
    },
    {
      product_id: "650000000000000000000004",
      user_id: "60e9c5f4e8e7a4301c123459",
      create_at: new Date(),
      quantity_moved: 5,
      movement_type: 'out',
      description: 'Sale of product',
    },
    {
      product_id: "650000000000000000000010", 
      user_id: "60e9c5f4e8e7a4301c123460",  
      create_at: new Date(),
      quantity_moved: 2,
      movement_type: 'in',
      description: 'Incoming shipment',
    },
    {
      product_id: "650000000000000000000012", 
      user_id: "60e9c5f4e8e7a4301c123460",  
      create_at: new Date(),
      quantity_moved: 1,
      movement_type: 'out',
      description: 'Product returned by customer',
    },
    {
      product_id: "650000000000000000000016", 
      user_id: "60e9c5f4e8e7a4301c123459",  
      create_at: new Date(),
      quantity_moved: 15,
      movement_type: 'in',
      description: 'Inventory adjustment',
    }
  ];

  try {
    await connectDB();

    // Clear the existing data in the Transaction collection
    await Transaction.deleteMany();
    console.log('\nOld transactions removed!');

    // Insert the new transactions
    await Transaction.insertMany(transactions);
    console.log('New transactions added!\n');
  } catch (err) {
    console.error('Error seeding transaction data:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

export default seedTransactions;