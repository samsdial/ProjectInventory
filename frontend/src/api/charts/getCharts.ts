import axios, { AxiosResponse } from "axios";
import { IGetChartError, IGetTopMovementsResponse, IGetTransactionHistoryResponse } from "../../interfaces/charts";

const endpointTransactionHistory: string = "http://localhost:3000/api/getTransactionHistory";
const endpointTopMovements: string = "http://localhost:3000/api/getTopMovements";


export const getTransactionHistory = async (initial_date: string, end_date: string, product: string): Promise<IGetTransactionHistoryResponse> => {
  try {
    const params = {
      initial_date,
      end_date,
      product,
    };

    const res: AxiosResponse<IGetTransactionHistoryResponse> = await axios.get(
      endpointTransactionHistory, { params }
    );
    const products: any = res.data;
    return { error: null, data: products.data };
  } catch (error: unknown) {
    let productError : IGetChartError;
    if (error instanceof Error) {
       productError  = {
        status: 500,
        message: error.message,
      };
    } else {
    productError = {
        status: 500,
        message: "Unknown error, try later.",
      };
    }

    if (axios.isAxiosError(error)) {
      productError.status = error.response?.status || 500;
      productError.message =
        error.response?.data?.message || "Error retrieving products.";
    }
    return { error: productError, data: null };
  }
};

export const getTopMovements = async (): Promise<IGetTopMovementsResponse> => {
  try {
    const res: AxiosResponse<IGetTopMovementsResponse> = await axios.get(
      endpointTopMovements
    );
    const products: any = res.data;
    return { error: null, data: products.data };
  } catch (error: unknown) {
    let productError : IGetChartError;
    console.log("error ", error)

    if (error instanceof Error) {
       productError  = {
        status: 500,
        message: error.message,
      };
    } else {
    productError = {
        status: 500,
        message: "Unknown error, try later.",
      };
    }

    if (axios.isAxiosError(error)) {
      productError.status = error.response?.status || 500;
      productError.message =
        error.response?.data?.message || "Error retrieving products.";
    }
    return { error: productError, data: null };
  }
};
