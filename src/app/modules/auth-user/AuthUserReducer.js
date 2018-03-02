"use strict";

import {IAuthActions, IUser} from "./AuthUserActions";
import {fromJS, List, Map} from "immutable";
import {ACCESS_TOKEN, COOKIES_DEFAULT_CONFIG, REFRESH_TOKEN} from "configs/constants";
import * as cookies from "js-cookie";

interface IAuthUserActions {
    ATTEMPT_GET_USER: string;
    GET_USER_SUCCEED: string;
    GET_USER_FAILED: string;

    ATTEMPT_LOG_OUT_USER: string;
    LOG_OUT_USER_SUCCEED: string;
    LOG_OUT_USER_FAILED: string;

    CLEAR: string;


    ATTEMPT_SIGN_IN: string;
    SIGN_IN_SUCCEED: string;
    SIGN_IN_FAILED: string;

}

export const actions: IAuthUserActions = {
    ATTEMPT_GET_USER: "ATTEMPT_GET_USER",
    GET_USER_SUCCEED: "GET_USER_SUCCEED",
    GET_USER_FAILED: "GET_USER_FAILED",

    ATTEMPT_LOG_OUT_USER: "ATTEMPT_LOG_OUT_USER",
    LOG_OUT_USER_SUCCEED: "LOG_OUT_USER_SUCCEED",
    LOG_OUT_USER_FAILED: "LOG_OUT_USER_FAILED",

    CLEAR: "CLEAR",

    ATTEMPT_SIGN_IN: "ATTEMPT_SIGN_IN",
    SIGN_IN_SUCCEED: "SIGN_IN_SUCCESS",
    SIGN_IN_FAILED: "SIGN_IN_FAILED",
};

export interface IUserData extends Map<string, any> {
    loggedInUser: IUser;
    fields: any;
    errors: any;
}

const defaultState: IUserData = fromJS({
    loggedInUser: null,
    messages: List(),
    fields: {},
    errors: {},
});

export default (state: IUserData = defaultState, {type, payload}: IAuthActions): IUserData => {
    switch (type) {
        case actions.CLEAR:
            return state
                .set("messages", List())
                .set("fields", Map())
                .set("errors", Map());

        case actions.SIGN_IN_SUCCEED:
            cookies.set(REFRESH_TOKEN, payload.token.refresh_token, COOKIES_DEFAULT_CONFIG);
            localStorage.setItem(ACCESS_TOKEN, payload.token.access_token);

            return state
                .set("loggedInUser", fromJS(payload.user));

        case actions.SIGN_IN_FAILED:
            return state
                .set("fields", Map(payload.fields || {}))
                .set("errors", Map(payload.errors || {}))
                .updateIn(["messages"], messages => messages.push(Map(payload.message || {})));

        case actions.GET_USER_SUCCEED:
            return state.set("loggedInUser", fromJS(payload.user));

        case actions.LOG_OUT_USER_SUCCEED:
        case actions.GET_USER_FAILED:
            return state.set("loggedInUser", null);

        case actions.LOG_OUT_USER_FAILED:
            return state
                .updateIn(["messages"], messages => messages.push(Map(payload.message || {})));

        default:
            return state;
    }
};
