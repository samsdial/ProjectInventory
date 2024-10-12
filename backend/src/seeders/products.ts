import mongoose from "mongoose";
import { Product } from '../models'; // Adjust the path as necessary

const seedProducts = async () => {
    const products = [
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000001"),
            name: "MacBook Pro",
            description: "High-performance laptop with M1 processor.",
            quantity: 100,
            stock_min: 10,
            stock_current: 90,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c2"), 
            brand_id: "Apple", // Example brand
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111901_mbp16-gray.png"
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000002"),
            name: "Dell XPS 13",
            description: "Ultralight laptop with Intel Core i7 processor.",
            quantity: 50,
            stock_min: 5,
            stock_current: 45,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c2"), 
            brand_id: "Dell",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://w7.pngwing.com/pngs/428/65/png-transparent-netbook-laptop-dell-xps-computer-hardware-laptop-electronics-gadget-netbook.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000003"),
            name: "Microsoft Windows 11 Pro",
            description: "Operating system for computers and laptops.",
            quantity: 200,
            stock_min: 20,
            stock_current: 180,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c3"), 
            brand_id: "Microsoft",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://1e3db468.rocketcdn.me/wp-content/uploads/2024/03/microsoft-windows-11-pro-1.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000004"),
            name: "Ubuntu Server 22.04 LTS (HVM), SSD Volume with Support by Terracloudx",
            description: "Linux operating system for servers.",
            quantity: 150,
            stock_min: 15,
            stock_current: 135,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c3"), 
            brand_id: "Canonical",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a6"),
            image: "https://d7umqicpi7263.cloudfront.net/img/product/c23e1212-1e78-49c7-9fba-7ca1a8123db4.png"
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000005"),
            name: "Cisco Router 2901",
            description: "Business router for corporate networks.",
            quantity: 80,
            stock_min: 8,
            stock_current: 72,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c4"),
            brand_id: "Cisco",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a6"),
            image: "https://core-systems.com/wp-content/uploads/2022/05/cisco-hero-template-2901.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000006"),
            name: "Ubiquiti UniFi Switch",
            description: "24-port managed switch for enterprise networks.",
            quantity: 60,
            stock_min: 6,
            stock_current: 54,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c4"),
            brand_id: "Ubiquiti",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a7"),
            image: "https://w7.pngwing.com/pngs/488/766/png-transparent-power-over-ethernet-ubiquiti-networks-network-switch-ubiquiti-unifi-switch-small-form-factor-pluggable-transceiver-wireless-network-interface-controller-computer-network-electronics-network.png"
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000007"),
            name: "WD MyCloud EX2 Ultra",
            description: "NAS with network storage support for businesses.",
            quantity: 40,
            stock_min: 4,
            stock_current: 36,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c5"),
            brand_id: "Western Digital",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a7"),
            image: "https://e7.pngegg.com/pngimages/972/274/png-clipart-wd-my-cloud-ex2-ultra-network-storage-systems-terabyte-western-digital-auto-body-cart-plans.png"
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000008"),
            name: "Dell PowerEdge T40",
            description: "Server for small businesses with capacity expansion.",
            quantity: 20,
            stock_min: 2,
            stock_current: 18,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c5"), 
            brand_id: "Dell",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a7"),
            image: "https://wintechnology.co/wp-content/uploads/2021/11/DELL-T140-1.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000009"),
            name: "Logitech MX Master 3",
            description: "Wireless mouse for IT professionals.",
            quantity: 150,
            stock_min: 15,
            stock_current: 135,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c6"), 
            brand_id: "Logitech",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://resource.logitech.com/w_800,c_lpad,ar_1:1,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000010"),
            name: "ASUS ProArt PA278QV",
            description: "Monitor for graphic design and development with high resolution.",
            quantity: 90,
            stock_min: 9,
            stock_current: 81,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c6"), 
            brand_id: "ASUS",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://dlcdnimgs.asus.com/websites/global/products/gvxnvsvumc3y1lyy/images/pic_true_beauty.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000011"),
            name: "Kaspersky Endpoint Security",
            description: "Security solution for workstations.",
            quantity: 120,
            stock_min: 12,
            stock_current: 108,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c7"), 
            brand_id: "Kaspersky",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a6"), 
            image: "https://e7.pngegg.com/pngimages/453/872/png-clipart-kaspersky-lab-kaspersky-internet-security-endpoint-security-kaspersky-anti-virus-antivirus-software-cloud-security-internet-software.png"
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000012"),
            name: "Palo Alto PA-220",
            description: "Firewall for small businesses with advanced features.",
            quantity: 70,
            stock_min: 7,
            stock_current: 63,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c7"), 
            brand_id: "Palo Alto Networks",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a6"),
            image: "https://www.paloguard.com.au/images/PA-Series/PA200-Series/PA220_FrontWtop.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000013"),
            name: "Visual Studio Code",
            description: "Cross-platform source code editor for web development.",
            quantity: 200,
            stock_min: 20,
            stock_current: 180,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c8"), 
            brand_id: "Microsoft",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://e7.pngegg.com/pngimages/326/636/png-clipart-visual-studio-code-full-logo-tech-companies.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000014"),
            name: "Docker",
            description: "Platform for application containerization.",
            quantity: 300,
            stock_min: 30,
            stock_current: 270,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c8"), 
            brand_id: "Docker",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a5"),
            image: "https://d1.awsstatic.com/acs/characters/Logos/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000015"),
            name: "AWS EC2",
            description: "Computing service in the cloud from Amazon Web Services.",
            quantity: 250,
            stock_min: 25,
            stock_current: 225,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c9"), 
            brand_id: "Amazon",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a7"),
            image: "https://w7.pngwing.com/pngs/608/385/png-transparent-aws-ec2-hd-logo.png" 
        },
        {
            _id: new mongoose.Types.ObjectId("650000000000000000000016"),
            name: "VMware vSphere",
            description: "Virtualization platform for enterprise servers.",
            quantity: 150,
            stock_min: 15,
            stock_current: 135,
            category_id: new mongoose.Types.ObjectId("65279c0c9f74a6d5b3f4d3c9"), 
            brand_id: "VMware",
            warehouse_id: new mongoose.Types.ObjectId("65279b7f69f7b3c23ef9e0a7"),
            image: "https://w7.pngwing.com/pngs/492/992/png-transparent-logo-vmware-vsphere-vcenter-virtualization-citrix-receiver-icon-text-logo-area.png"
        }
    ]

    try {
        // Clear the existing data in the Product collection
        await Product.deleteMany();
        console.log("\nOld products removed!");
    
        // Insert the new products
        await Product.insertMany(products);
        console.log("New products added!\n");
      } catch (err) {
        console.error("Error seeding data:", err);
      }
}

export default seedProducts;