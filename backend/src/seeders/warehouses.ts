import mongoose from "mongoose";

import { Warehouse } from "../models";

const seedWarehouses = async () => {
  const warehouses = [
    {
      _id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
      name: "Central Warehouse",
      location: "123 Main St, Springfield",
      id_user: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123456"),
    },
    {
      _id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a6"),
      name: "Eastside Depot",
      location: "789 East Blvd, Springfield",
      id_user: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123457"),
    },
    {
      _id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a7"),
      name: "Westside Storage",
      location: "456 West Ave, Springfield",
      id_user: new mongoose.Types.ObjectId("60e9c5f4e8e7a4301c123458"),
    },
  ];

  try {
    // Clear the existing data in the Warehouse collection
    await Warehouse.deleteMany();
    console.log("\nOld warehouses removed!");

    // Insert the new warehouses
    await Warehouse.insertMany(warehouses);
    console.log("New warehouses added!\n");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

export default seedWarehouses;
