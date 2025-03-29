export interface ApiClientResourcesProps<T = any, K = any> {
    makeRequest: (props?: K) => void,
    data: T,
    args: K,
    isLoading: boolean,
    isSuccess: boolean, 
    isPaused: boolean,
    isError: boolean,
    isIdle: boolean,
}