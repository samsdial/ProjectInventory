import bcrypt from "bcryptjs";

import { User } from '../models/User';

const seedUsers = async () => {
  const users = [
    {
      "username": "john_doe",
      "is_admin": true,
      "password": await bcrypt.hash('password123', 10),
      "email": "john.doe@example.com"
    },
    {
      "username": "jane_smith",
      "is_admin": false,
      "password": await bcrypt.hash('password456', 10) ,
      "email": "jane.smith@example.com"
    },
    {
      "username": "mike_ross",
      "is_admin": false,
      "password": await bcrypt.hash('password789', 10),
      "email": "mike.ross@example.com"
    },
    {
      "username": "lucy_gray",
      "is_admin": true,
      "password": await bcrypt.hash('securepass001', 10),
      "email": "lucy.gray@example.com"
    },
    {
      "username": "emma_wilson",
      "is_admin": false,
      "password": await bcrypt.hash('mypassword', 10),
      "email": "emma.wilson@example.com"
    }
  ];
  
  try {
    // Clear the existing data in the User collection
    await User.deleteMany();
    console.log('Old users removed!');

    // Insert the new users
    await User.insertMany(users);
    console.log('New users added!');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

export default seedUsers;
