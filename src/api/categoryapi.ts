import api from ".";
import { AxiosError } from "axios";
import type { Category } from "my-types";

interface ApiResponse<T> {
  payload: T;
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get<ApiResponse<Category[]>>("/category");
    return res.data.payload;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching categories:", err.message);
    throw err;
  }
};