import { takeEvery } from "redux-saga/effects";
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from "./auth";
import { initIngredientSaga } from "./burgerBuilder";
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUHT_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* wathBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga);
}