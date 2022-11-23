import axios, { AxiosInstance } from "axios";
import {Restaurant, RestaurantPage} from '../types/Restaurant';
import { logHttpRequest, logHttpResponse } from "./Interceptors";

const _httpClient: AxiosInstance = axios.create({
  baseURL: 'https://api.dev.wdtek.xyz/',
});

_httpClient.interceptors.request.use(logHttpRequest);
_httpClient.interceptors.response.use(logHttpResponse);

class RestaurantServices {
  static async fetchRestaurants(
    limit: number,
    offset: number,
  ): Promise<RestaurantPage> {
    const result = await _httpClient.get(
      `restaurants?limit=${limit}&offset=${offset}`,
    );
    return result.data;
  }

  static async fetchRestaurantDetails(id: string): Promise<Restaurant> {
    const result = await _httpClient.get(`restaurants/${id}`);
    return result.data;
  }
}

export default RestaurantServices;
