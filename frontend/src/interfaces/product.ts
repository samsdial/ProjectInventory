
export interface IGetProductResponse {
    error: IGetProductError | null;
    data: IProduct[] | null
}

export interface IGetProductError {
    status: number;
    message: string;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    stock: number;
    category: string;
    imageUrl?: string;
}