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

export interface IGetTransactionResponse {
    error: IGetProductError | null;
    data: ITransaction[] | null;
}

export interface ITransaction {
    id: string;
    product_id: {
        name: string;
    },
    user_id: {
        name: string
    },
    create_at: string;
    quantity_moved: number;
    movement_type: string;
    description?: string;
  }
  