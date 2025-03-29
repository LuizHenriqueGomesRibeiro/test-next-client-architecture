import { ApiConfig, MethodProps, ServerApiMethods } from "../types";
import { endpoints } from "../../endpoints";

import http from "../../http";

function createApiClass<T extends ApiConfig>(list: T) {
    return class Api {
        constructor() {
            Object.keys(list).forEach((key) => {
                if (list[key]) {
                    (this as any)[key] = async (params?: any) => {
                        return this.request(list[key].method, list[key].url, list[key].authenticated);
                    };
                } else {
                    console.error(`A chave ${key} está indefinida no objeto api.`);
                }
            });
        }
    
        async request(method: MethodProps, url: string, authenticated?: boolean): Promise<any> {
            const client = authenticated ? http.privateClient() : http.publicClient();
            const response = await client[method](url);
            return response.data;
        }
    };
}

export type ServerInstanceType = ServerApiMethods<typeof endpoints>;
export const PrimitiveServer = createApiClass(endpoints);