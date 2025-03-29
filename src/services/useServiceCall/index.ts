"use client";

import { useMutation } from "react-query";

const useServiceCall = ({ fn }: any) => {
    const { 
        mutateAsync,
        isLoading,
        isSuccess, 
        isPaused,
        isError,
        isIdle,
        data,
    } = useMutation(async (...args: any) => {
        const response = await fn(...args);
        return response;
    });

    const makeRequest = (props: any) => {
        mutateAsync(props);
    }

    return {
        makeRequest,
        data: data,
        args: data?.args,
        isLoading,
        isSuccess, 
        isPaused,
        isError,
        isIdle,
    }
}

export default useServiceCall;