interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export function createResponse<T>(data: T, message: string, success: boolean): ApiResponse<T> {
  return {
    data,
    message,
    success,
  };
}

export interface loginResponse {
  token: string;
  user: { role: string; email: string; id: string; name: string };
}
