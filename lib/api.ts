import { Product } from "@/types";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const apiConfig = {
  baseUrl: "https://fakestoreapi.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  tokenName: "authToken",
};

const API_PATHS = {
  LOGIN: "/auth/login",
  USERS: "/users",
  USERS_ID: (id: number) => `/users/${id}`,
  PRODUCTS: "/products",
  PRODUCTS_ID: (id: string) => `/products/${id}`,
  CATEGORIES: "/products/categories",
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  CARTS: "/carts",
  CARTS_ID: (id: number) => `/carts/${id}`,
};

export const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
  validateStatus: (status) => {
    return true;
  },
});

// apiClient.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await SecureStore.getItemAsync(apiConfig.tokenName);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const credentials = { username: "johnd", password: "m38rmF$" };
    // const credentials = { username: username.trim(), password: password.trim() }; // TODO: replace mock credentials with real ones
    const response = await apiClient.post(API_PATHS.LOGIN, credentials);
    if (response.status !== 200) {
      throw new Error(response.data.message || "Login failed");
    }
    const { token } = response.data;
    await SecureStore.setItemAsync(apiConfig.tokenName, token);

    return true;
  } catch (error) {
    return false;
  }
}

export async function register({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const user = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    const response = apiClient.post(API_PATHS.USERS, user);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const token = await SecureStore.getItemAsync(apiConfig.tokenName);
    if (token) {
      return token;
    }
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    await SecureStore.deleteItemAsync(apiConfig.tokenName);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get(API_PATHS.PRODUCTS);
    if (response.status !== 200) {
      throw new Error(response.data.message || "Get Products failed");
    }

    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getProductById({
  id,
}: {
  id: string;
}): Promise<Product | null> {
  try {
    const response = await apiClient.get(API_PATHS.PRODUCTS_ID(id));

    if (response.status !== 200) {
      throw new Error(response.data.message || "Get Product by ID failed");
    }

    return response.data;
  } catch (error) {
    return null;
  }
}
