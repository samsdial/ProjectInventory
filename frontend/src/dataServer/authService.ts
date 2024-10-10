import axios, { AxiosResponse } from "axios";
import { IAuthCredentials, IAuthError, IAuthResponse } from "../interfaces";

const urlEndpoint: string = "./dataJson.json"

export const authService = async (credentials: IAuthCredentials): Promise<IAuthResponse | IAuthError | undefined> => {
    try {
        //const res: AxiosResponse<IAuthResponse> = await axios.post(urlEndpoint, credentials);
        const res: AxiosResponse<IAuthResponse> = await axios.get(urlEndpoint);
        return res.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 401) {
                return { state: 'error', message: 'Email y/o contraseña incorrecta.' };
            } else {
                console.log("Error del servidor:", error.response?.data || error.message);
                return { state: 'error', message: 'Fallo inesperado, por favor intente de nuevo.' };
            }
        } else {
            console.error("Error inesperado:", error);
            return { state: 'error', message: 'Error desconocido, intente más tarde.' };
        }
    }
};
