"use strict";

import {actions} from "./AuthUserReducer";

export interface IToken {
    access_token: string;
    refresh_token: string;
}

export interface IUser {
    fullName: string;
}

export interface ISignInResult {
    token: IToken;
    user: IUser;
}

export interface IAuthActions {
    type: string;
    payload?: {
        user?: IUser,
        data?: any,
        fields?: any;
        errors?: any;
        message?: { type: string, message: string };
        token?: IToken;
    };
}

export function attemptGetUser(): IAuthActions {
    return {type: actions.ATTEMPT_GET_USER};
}

export function getUserFailed(): IAuthActions {
    return {type: actions.GET_USER_FAILED};
}

export function getUserSucceed(user: IUser): IAuthActions {
    return {type: actions.GET_USER_SUCCEED, payload: {user}};
}

export function attemptSignIn(data: any): IAuthActions {
    return {type: actions.ATTEMPT_SIGN_IN, payload: {data: data}};
}

export function signInSucceed(result: ISignInResult): IAuthActions {
    return {type: actions.SIGN_IN_SUCCEED, payload: {user: result.user, token: result.token}};
}

export function signInFailed(fields: any, message: string = null, errors: any = null): IAuthActions {
    return {
        type: actions.SIGN_IN_FAILED,
        payload: {
            fields: fields,
            message: message && {
                type: "danger",
                message: message
            },
            errors: errors
        }
    };
}

export function clear(): IAuthActions {
    return {type: actions.CLEAR};
}

export function attemptLogOutUser(): IAuthActions {
    return {type: actions.ATTEMPT_LOG_OUT_USER};
}

export function logOutUserFailed(message?: string): IAuthActions {
    return {
        type: actions.LOG_OUT_USER_FAILED,
        payload: {
            message: message && {
                type: "danger",
                message: message
            }
        }
    };
}

export function logOutUserSucceed(): IAuthActions {
    return {
        type: actions.LOG_OUT_USER_SUCCEED
    };
}
