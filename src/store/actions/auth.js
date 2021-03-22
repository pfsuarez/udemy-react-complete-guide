import axios from "../../axios-orders";
import * as actionTypes from "./actionTypes";

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
    };
};