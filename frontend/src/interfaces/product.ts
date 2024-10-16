export interface IGetProductResponse {
  error: IGetProductError | null;
  data: IProduct[] | null;
}

export interface IGetProductError {
  status: number;
  message: string;
}

export interface IProduct {
  id: string;
  brand_id: string;
  category_id: { _id: string, name: string};
  createdAt: string;
  description: string;
  image?: string;
  name: string;
  quantity: number;
  stock_current: number;
  stock_min: string;
  warehouse_id: { name: string};
}
