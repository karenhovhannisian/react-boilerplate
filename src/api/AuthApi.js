"use strict";

import axios, {AxiosPromise} from "axios";
import urls from "configs/urls";
import * as cookies from "js-cookie";
import convert, {types} from "../helpers/form/typeConverter";
import {ACCESS_TOKEN, REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET} from "configs/constants";

export function attemptSignUp(data) {
    const csrf = localStorage.getItem("csrf");
    const role = data.role;
    delete data.role;

    return axios.request({
        url: `${urls.apiUrl}/auth/sign-up`,
        method: "POST",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Role": role,
            "X-XSRF-Token": csrf
        },
        data: data
    });
}

export function attemptSignIn(data) {

    return axios.request({
        method: "POST",
        url: `${urls.apiUrl}/auth/sign-in`,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        auth: {
            username: data.email,
            password: data.password
        },
        data: data
    });
}

export function attemptGetUser() {
    const csrf = localStorage.getItem("csrf");
    const token = localStorage.getItem("token");

    return axios.request({
        url: `${urls.apiUrl}/auth/get-user`,
        method: "PATCH",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-XSRF-Token": csrf,
            "Authorization": `Bearer ${token}`
        }
    });
}

export function attemptLogOutUser() {
    const token = localStorage.getItem("token");

    return axios.request({
        url: `${urls.apiUrl}/auth/sign-out`,
        method: "POST",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
}

export function refreshToken() {
    const csrf = localStorage.getItem("csrf");
    const token = localStorage.getItem("token");

    return axios.request({
        url: `${urls.apiUrl}/auth/refresh-token`,
        method: "PUT",
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-XSRF-Token": csrf,
            "Authorization": `Bearer ${token}`
        }
    });
}

export function attemptResetPassword(data) {
    const csrf = localStorage.getItem("csrf");
    const {token} = data;
    delete data.token;

    return axios.request({
        method: "PATCH",
        url: `${urls.apiUrl}/auth/reset-password/${token}`,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-XSRF-Token": csrf
        },
        data: data
    });
}

export function attemptConfirmEmail(token) {
    const csrf = localStorage.getItem("csrf");

    return axios.request({
        method: "PATCH",
        url: `${urls.apiUrl}/auth/confirm-email/${token}`,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-XSRF-Token": csrf
        }
    });
}

export function attemptRequestPasswordReset(data) {
    const csrf = localStorage.getItem("csrf");

    return axios.request({
        method: "POST",
        url: `${urls.apiUrl}/auth/request-password-reset`,
        withCredentials: true,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-XSRF-Token": csrf
        },
        data: data
    });
}

