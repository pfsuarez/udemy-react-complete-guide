import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as webApiKey from "../../firebaseWebApiKey";

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webApiKey.FIREBASE_WEB_API_KEY}`,
            authData)
            .then(response => {
                console.log("", response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log("", err);
                dispatch(authFail(err));
            });
    };
};