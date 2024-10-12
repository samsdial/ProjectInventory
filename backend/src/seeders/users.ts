import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { User } from '../models';

const seedUsers = async () => {
  const users = [
    {
      _id: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123456"),
      name: "John Doe",
      username: "john_doe",
      is_admin: true,
      password: await bcrypt.hash('password123', 10),
      email: "john.doe@example.com"
    },
    {
      _id: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123457"),
      name: "Jane Smith",
      username: "jane_smith",
      is_admin: false,
      password: await bcrypt.hash('password456', 10) ,
      email: "jane.smith@example.com"
    },
    {
      _id: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123458"),
      name: "Mike Ross",
      username: "mike_ross",
      is_admin: false,
      password: await bcrypt.hash('password789', 10),
      email: "mike.ross@example.com"
    },
    {
      _id: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123459"),
      name: "Lucy Gray",
      username: "lucy_gray",
      is_admin: true,
      password: await bcrypt.hash('securepass001', 10),
      email: "lucy.gray@example.com"
    },
    {
      _id: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123460"),
      name: "Emma Wilson",
      username: "emma_wilson",
      is_admin: false,
      password: await bcrypt.hash('mypassword', 10),
      email: "emma.wilson@example.com"
    }
  ];
  
  try {
    // Clear the existing data in the User collection
    await User.deleteMany();
    console.log('\nOld users removed!');

    // Insert the new users
    await User.insertMany(users);
    console.log('New users added!\n');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

export default seedUsers;
