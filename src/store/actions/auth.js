import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as webApiKey from "../../firebaseWebApiKey";

const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
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

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webApiKey.FIREBASE_WEB_API_KEY}`;
        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webApiKey.FIREBASE_WEB_API_KEY}`;
        }

        axios.post(url,
            authData)
            .then(response => {
                console.log("", response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log("", err);
                dispatch(authFail(err.response.data.error));
            });
    };
};