import { createConfiguredAxiosInstance } from "../axios";
import { AxiosInstance } from "axios";
import { BASE_URL } from "../../api";

class Http {
    public publicClient() {
        return createConfiguredAxiosInstance({
            url: BASE_URL,
            withBearerToken: false,
        }) as AxiosInstance;
    }
  
    public privateClient() {
        return createConfiguredAxiosInstance({
            url: BASE_URL,
            withBearerToken: true,
        }) as AxiosInstance;
    }
}

const http = new Http();
export default http;