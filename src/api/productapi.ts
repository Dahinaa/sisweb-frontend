import api from ".";
import { AxiosError } from "axios";
import type { Product } from "my-types";

interface ApiResponse<T> {
  payload: T;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get<ApiResponse<Product[]>>("/product");
    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching products:", err.message);
    throw err;
  }
};