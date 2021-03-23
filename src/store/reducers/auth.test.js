import authReducer from "./auth";
import * as actionTypes from "../actions/actionTypes";


describe('auth reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };

        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        const initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };

        const action = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        };

        const resultState = {
            ...initialState,
            token: 'some-token',
            userId: 'some-user-id'
        }
        expect(authReducer(initialState, action)).toEqual(resultState);
    });
});