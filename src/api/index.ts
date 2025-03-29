import { ApiEndpoint } from "../services/endpoints/types";

export const BASE_URL = "https://dog.ceo/api";

export const api = {
    requestc: {
        url: "breeds/image/random",
        authenticated: false,
        method: 'get'
    }
} as const satisfies Record<string, ApiEndpoint>;