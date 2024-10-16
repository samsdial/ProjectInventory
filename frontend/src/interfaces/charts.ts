export interface IGetTopMovementsResponse {
  error: IGetChartError | null;
  data: ITopMovements | null;
}

export interface ITopMovements {
  in_total: number;
  out_total: number;
  total_moved: number;
  product_id: string;
  product_name: string;
  in_percentage: number;
  out_percentage: number;
}

export interface IGetTransactionHistoryResponse {
  error: IGetChartError | null;
  data: ITransactionHistory | null;
}

export interface ITransactionHistory {
  _id: string;
  product_id: {
    _id: string;
    name: string;
  };
  user_id: string;
  create_at: string;
  quantity_moved: number;
  movement_type: string;
  description: string;
}

export interface IGetChartError {
  status: number;
  message: string;
}
