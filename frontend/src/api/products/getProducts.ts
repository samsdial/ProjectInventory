import axios, { AxiosResponse } from "axios";
import { IGetProductError, IGetProductResponse, IProduct } from "../../interfaces/product";

const urlEndpoint: string = "https://apimocha.com/sigindioy/products";

const product = {
    "error": null,
    "data": [
        {
            "id": "1",
            "name": "Cámara Digital",
            "description": "Cámara digital de alta resolución con lente intercambiable.",
            "stock": 25,
            "category": "Electrónica",
            "imageUrl": "https://example.com/images/camara_digital.jpg"
        },
        {
            "id": "2",
            "name": "Auriculares Bluetooth",
            "description": "Auriculares inalámbricos con cancelación de ruido.",
            "stock": 50,
            "category": "Electrónica",
            "imageUrl": "https://example.com/images/auriculares_bluetooth.jpg"
        },
        {
            "id": "3",
            "name": "Laptop Gaming",
            "description": "Laptop de alto rendimiento para videojuegos.",
            "stock": 15,
            "category": "Computación",
            "imageUrl": "https://example.com/images/laptop_gaming.jpg"
        },
        {
            "id": "4",
            "name": "Smartphone",
            "description": "Smartphone con pantalla AMOLED y 128GB de almacenamiento.",
            "stock": 30,
            "category": "Electrónica",
            "imageUrl": "https://example.com/images/smartphone.jpg"
        },
        {
            "id": "5",
            "name": "Reloj Inteligente",
            "description": "Reloj inteligente con seguimiento de actividad y monitoreo de salud.",
            "stock": 40,
            "category": "Accesorios",
            "imageUrl": "https://example.com/images/reloj_inteligente.jpg"
        },
        {
            "id": "6",
            "name": "Teclado Mecánico",
            "description": "Teclado mecánico RGB con retroiluminación personalizable.",
            "stock": 20,
            "category": "Computación",
            "imageUrl": "https://example.com/images/teclado_mecanico.jpg"
        },
        {
            "id": "7",
            "name": "Monitor 4K",
            "description": "Monitor 4K de 27 pulgadas para una experiencia visual inmersiva.",
            "stock": 10,
            "category": "Computación",
            "imageUrl": "https://example.com/images/monitor_4k.jpg"
        },
        {
            "id": "8",
            "name": "Tablet",
            "description": "Tablet con pantalla táctil y 64GB de almacenamiento.",
            "stock": 18,
            "category": "Electrónica",
            "imageUrl": "https://example.com/images/tablet.jpg"
        },
        {
            "id": "9",
            "name": "Altavoz Inteligente",
            "description": "Altavoz inteligente con asistente virtual integrado.",
            "stock": 35,
            "category": "Electrónica",
            "imageUrl": "https://example.com/images/altavoz_inteligente.jpg"
        },
        {
            "id": "10",
            "name": "Disco Duro Externo",
            "description": "Disco duro externo de 1TB con conectividad USB 3.0.",
            "stock": 12,
            "category": "Almacenamiento",
            "imageUrl": "https://example.com/images/disco_duro_externo.jpg"
        }
    ]
    }


export const getProducts = async (): Promise<IGetProductResponse> => {
    try {
        //const res: AxiosResponse<IGetProductResponse> = await axios.get(urlEndpoint);
        //const products: IProduct[] = res.data.data!;
        return { error: null, data: product.data }; 
    } catch (error: unknown) {
        const productError: IGetProductError = {
            status: 500,
            message: "Unknown error, try later.",
        };

        if (axios.isAxiosError(error)) {
            productError.status = error.response?.status || 500;
            productError.message = error.response?.data?.message || "Error retrieving products.";
        }
        return { error: productError, data: null };
    }
};
