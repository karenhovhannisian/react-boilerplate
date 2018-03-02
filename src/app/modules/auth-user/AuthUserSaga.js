"use strict";

import {call, put, takeLatest} from "redux-saga/effects";
import {REFRESH_TOKEN, COOKIES_DEFAULT_CONFIG} from "configs/constants";
import * as Actions from "./AuthUserActions";
import {actions} from "./AuthUserReducer";
import * as cookies from "js-cookie";
import * as Api from "api/AuthApi";

export function* attemptSignIn({payload: {data}}: any): any {
    try {
        yield put(Actions.clear());
        const {data: token}: any = yield call(Api.attemptSignIn, data);
        const {data: user}: any = yield call(Api.attemptGetUser, token.access_token);
        yield put(Actions.signInSucceed({user, token}));
    } catch ({response: {status, data: {error_description}}}) {
        yield put(Actions.signInFailed(data, error_description ));
    }
}

function* attemptLogOutUser(): any {
    try {
        yield put(Actions.clear());
        yield localStorage.clear();
        yield cookies.remove(REFRESH_TOKEN, COOKIES_DEFAULT_CONFIG);
        yield put(Actions.logOutUserSucceed());
    } catch ({response: {status, data: {message, errors}}}) {
        yield put(Actions.logOutUserFailed((errors && errors.message) || message));
    }
}

function* authUserSaga(): any {
    yield takeLatest(actions.ATTEMPT_SIGN_IN, attemptSignIn);
    yield takeLatest(actions.ATTEMPT_LOG_OUT_USER, attemptLogOutUser);
}

export default authUserSaga;
