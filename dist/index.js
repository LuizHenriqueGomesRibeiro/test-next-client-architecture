"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  clientNextClientArchitecture: () => clientNextClientArchitecture,
  serverNextClientArchitecture: () => serverNextClientArchitecture
});
module.exports = __toCommonJS(index_exports);

// src/services/useServiceCall/index.ts
var import_react_query = require("react-query");
var useServiceCall = ({ fn }) => {
  const {
    mutateAsync,
    isLoading,
    isSuccess,
    isPaused,
    isError,
    isIdle,
    data
  } = (0, import_react_query.useMutation)(async (...args) => {
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
var import_axios = __toESM(require("axios"));
var createConfiguredAxiosInstance = (options) => {
  const axiosInstance = import_axios.default.create({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clientNextClientArchitecture,
  serverNextClientArchitecture
});
