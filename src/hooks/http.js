import { useReducer, useCallback } from "react";

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'CLEAR':
            return { isLoading: false, error: null };
        case 'SEND':
            return { isLoading: true, error: null, data: null };
        case 'RESPONSE':
            return { ...currentHttpState, isLoading: false, data: action.responseData };
        case 'ERROR':
            return { isLoading: false, error: action.errorMessage };
        default:
            throw new Error('Should not get there!');
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, { isLoading: false, error: null, data: null });

    const sendRequest = useCallback((url, method, body) => {
        dispatchHttp({ type: 'SEND' });

        fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                dispatchHttp({ type: 'RESPONSE', responseData })
            })
            .catch(error => {
                dispatchHttp({ type: 'ERROR', errorMessage: error.message });
            });
    }, []);

    return {
        isLoading: httpState.isLoading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest
    };
};

export default useHttp;