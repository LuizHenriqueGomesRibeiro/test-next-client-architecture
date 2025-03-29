// src/services/useServiceCall/index.ts
import { useMutation } from "react-query";
var useServiceCall = ({ fn }) => {
  const {
    mutateAsync,
    isLoading,
    isSuccess,
    isPaused,
    isError,
    isIdle,
    data
  } = useMutation(async (...args) => {
    const response = await fn(...args);
    return response;
  });
  const makeRequest = (props) => {
    mutateAsync(props);
  };
  return {
    makeRequest,
    data,
    args: data?.args,
    isLoading,
    isSuccess,
    isPaused,
    isError,
    isIdle
  };
};
var useServiceCall_default = useServiceCall;

// src/services/api/client/index.ts
function createPrimitiveClient() {
  class PrimitiveClient2 {
    constructor() {
      Object.keys(serverNextClientArchitecture).forEach((key) => {
        this[key] = () => {
          return useServiceCall_default({ fn: serverNextClientArchitecture[key] });
        };
      });
    }
  }
  return PrimitiveClient2;
}
var PrimitiveClient = createPrimitiveClient();

// src/api/index.ts
var BASE_URL = "https://dog.ceo/api";
var api = {
  breeds_image_random: {
    url: "breeds/image/random",
    authenticated: false,
    method: "get"
  },
  breed_hound_images: {
    url: "breed/hound/images",
    authenticated: false,
    method: "get"
  }
};

// src/services/endpoints/index.ts
var endpoints = api;

// src/services/axios/index.ts
import axios from "axios";
var createConfiguredAxiosInstance = (options) => {
  const axiosInstance = axios.create({
    ...options,
    baseURL: options.url,
    headers: {
      "Content-Type": "application/json"
    }
  });
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

// src/services/http/index.ts
var Http = class {
  publicClient() {
    return createConfiguredAxiosInstance({
      url: BASE_URL,
      withBearerToken: false
    });
  }
  privateClient() {
    return createConfiguredAxiosInstance({
      url: BASE_URL,
      withBearerToken: true
    });
  }
};
var http = new Http();
var http_default = http;

// src/services/api/server/index.ts
function createApiClass(list) {
  return class Api {
    constructor() {
      Object.keys(list).forEach((key) => {
        this[key] = async (params) => {
          return this.request(list[key].method, list[key].url, list[key].authenticated);
        };
      });
    }
    async request(method, url, authenticated) {
      const client = authenticated ? http_default.privateClient() : http_default.publicClient();
      const response = await client[method](url);
      return response.data;
    }
  };
}
var PrimitiveServer = createApiClass(endpoints);

// src/index.ts
var serverNextClientArchitecture = new PrimitiveServer();
var clientNextClientArchitecture = new PrimitiveClient();
export {
  clientNextClientArchitecture,
  serverNextClientArchitecture
};
