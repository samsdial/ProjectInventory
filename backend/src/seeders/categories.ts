import mongoose from 'mongoose';
import { Category } from '../models';

const categories = [
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c2"),
        name: "Computers and Laptops",
        description: "Desktop, laptop, and workstation equipment.",
        icon: "💻", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c3"),
        name: "Software and Licenses",
        description: "Operating system, development, and utility software.",
        icon: "🖥️", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c4"),
        name: "Networking and Communications",
        description: "Equipment for networks, routers, switches, and communications.",
        icon: "🌐", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c5"),
        name: "Storage and Servers",
        description: "Storage devices, servers, and backup systems.",
        icon: "🗄️", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c6"),
        name: "Peripherals and Accessories",
        description: "Printers, keyboards, mice, monitors, and accessories.",
        icon: "🖨️", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c7"),
        name: "Information Security",
        description: "Security software and hardware: Firewalls, antivirus, etc.",
        icon: "🔒", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c8"),
        name: "Web Development and Tools",
        description: "Tools and platforms for web and mobile development.",
        icon: "🌐", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c9"),
        name: "Cloud and Virtualization",
        description: "Cloud computing solutions and virtualization tools.",
        icon: "☁️", 
    },
    {
        _id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c1"),
        name: "IoT and Automation",
        description: "Devices and platforms for IoT and automation.",
        icon: "📡", 
    },
];

const seedCategories = async () => {
    try {
        // Clear existing data in the Category collection
        await Category.deleteMany();
        console.log('\nOld categories removed!');

        // Insert new categories
        await Category.insertMany(categories);
        console.log('New categories added!\n');
    } catch (err) {
        console.error('Error seeding categories:', err);
    }
};

export default seedCategories;
