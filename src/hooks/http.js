import { useReducer, useCallback } from "react";

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'CLEAR':
            return { isLoading: false, error: null, extra: null, identifier: action.identifier };
        case 'SEND':
            return { isLoading: true, error: null, data: null, extra: null };
        case 'RESPONSE':
            return { ...currentHttpState, isLoading: false, data: action.responseData, extra: action.extra };
        case 'ERROR':
            return { isLoading: false, error: action.errorMessage };
        default:
            throw new Error('Should not get there!');
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        isLoading: false,
        error: null,
        data: null,
        extra: null,
        identifier: null
    });

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifier });

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
                dispatchHttp({ type: 'RESPONSE', responseData, extra: reqExtra })
            })
            .catch(error => {
                dispatchHttp({ type: 'ERROR', errorMessage: error.message });
            });
    }, []);

    return {
        isLoading: httpState.isLoading,
        data: httpState.data,
        error: httpState.error,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier,
        sendRequest: sendRequest
    };
};

export default useHttp;