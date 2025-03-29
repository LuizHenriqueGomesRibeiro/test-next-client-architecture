import { ApiEndpoint } from "../services/endpoints/types";

export const BASE_URL = "https://dog.ceo/api";

export const api = {
    breeds_image_random: {
        url: "breeds/image/random",
        authenticated: false,
        method: 'get'
    },
    breed_hound_images: {
        url: "breed/hound/images",
        authenticated: false,
        method: 'get'
    },
} as const satisfies Record<string, ApiEndpoint>;