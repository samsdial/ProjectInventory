import axios, { AxiosResponse } from "axios";
import { IAuthCredentials, IAuthError, IAuthResponse } from "../interfaces";

const urlEndpoint: string = "https://apimocha.com/sigindioy/login";

export const authUser = async (credentials: IAuthCredentials): Promise<IAuthResponse> => {
  try {
    const res: AxiosResponse<IAuthResponse> = await axios.get(urlEndpoint);
    return res.data;
  } catch (error: unknown) {

    const authError: IAuthError = {
      status: 500,
      message: "Unknown error, try later.",
    };

    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          authError.status = 401
          authError.message = "Incorrect email and/or password.";
        } else {
          console.log("Server error:", error.response.data || error.message);
          authError.status = error.response.status;
          authError.message = error.response.data || error.message || "Unexpected error, please try again.";
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
    return { error: authError, data: null };
  }
};
