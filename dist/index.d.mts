type MethodProps = 'get' | 'post' | 'put' | 'delete';
type ApiConfig = {
    [key: string]: {
        url: string;
        method: MethodProps;
        authenticated: boolean;
        ARGS_PROPS?: unknown;
        DATA_PROPS?: unknown;
    };
};
type ServerApiMethods<T extends ApiConfig> = {
    [K in keyof T]: (params?: T[K]['ARGS_PROPS']) => Promise<T[K]['DATA_PROPS']>;
};

interface ApiClientResourcesProps<T = any, K = any> {
    makeRequest: (props?: K) => void;
    data: T;
    args: K;
    isLoading: boolean;
    isSuccess: boolean;
    isPaused: boolean;
    isError: boolean;
    isIdle: boolean;
}

declare const endpoints: {
    readonly requestc: {
        readonly url: "breeds/image/random";
        readonly authenticated: false;
        readonly method: "get";
    };
};

type ClientApiMethods<T extends ApiConfig> = {
    [K in keyof T]: (params?: any) => ApiClientResourcesProps<T[K]["DATA_PROPS"], T[K]["ARGS_PROPS"]>;
};
type ApiClientInstanceType = ClientApiMethods<typeof endpoints>;

type ServerInstanceType = ServerApiMethods<typeof endpoints>;

declare const serverNextClientArchitecture: ServerInstanceType;
declare const clientNextClientArchitecture: ApiClientInstanceType;

export { clientNextClientArchitecture, serverNextClientArchitecture };
