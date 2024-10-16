import axios, { AxiosResponse } from "axios";
import {
  IGetProductError,
  IGetProductResponse,
} from "../../interfaces/product";

const urlEndpoint: string = "http://localhost:3000/api/products";

export const getProducts = async (): Promise<IGetProductResponse> => {
  try {
    const res: AxiosResponse<IGetProductResponse> = await axios.get(
      urlEndpoint
    );
    const products: any = res.data;
    return { error: null, data: products.data };
  } catch (error: unknown) {
    let productError : IGetProductError;
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
