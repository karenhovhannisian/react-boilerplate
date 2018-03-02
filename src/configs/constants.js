"use strict";

import urls from "configs/urls";

export const NOTIFICATION_TYPES: Array<string> = [
    "danger", "success", "warning"
];

export const BUTTONS: any = {
    SIGN_UP: "Sign up",
    SIGN_IN: "Sign in",
    LOGIN: "Login",
    FACEBOOK: "Sign in with Facebook",
    LOG_OUT: "Log out",
    FILTER: "Filter",
    ME: "Me"
};

export const DASHBOARD_PAGE_TEXT: any = {
    TITLE: "you’re signed in",
    ACCESS_TOKEN: "Your access token is:",
    REFRESH_TOKEN: "Your refresh token is:"
}


export const LINKS: any = {
    FORGOT_PASS: "Forgot your password?",
    DONT_HAVE_ACCOUNT: "Dont have an account?"
}

export const BRAND: string = "Welcome";

export const MAKE_CALLS: string = "Let’s start making calls.";

export const PASSWORD_MIN_LENGTH: number = 8;

export const REFRESH_TOKEN: string = "refresh_token";

export const ACCESS_TOKEN: string = "token";

export const CLIENT_ID: string = "pocketconf";

export const CLIENT_SECRET: string = "bGl2ZS10ZXN0";

export const APP_MAIN_ROUTE: string = "/dashboard";

export const FORBIDDEN: number = 403;

export const NOT_FOUND: number = 404;

export const UNAUTHORIZED: number = 401;

export const VALIDATION_ERROR: number = 422;

export const REQUIRED: (resource: string) => string = resource => `${resource} is required!`;

export const INVALID_EMAIL: (resource: string) => string = resource => `${resource} is invalid`;

export const LENGTH_REQUIRED: (resource: string, options: { min: number; max: number } | { min: number; max?: undefined } | { min?: undefined; max: number }) => string =
    (resource, options) => {
        const {min, max} = options;
        if (min && max) {
            return `${resource} must be at least ${min} and maximum ${max} characters!`;
        } else if (min) {
            return `${resource} must be at least ${min} characters!`;
        } else {
            return `${resource} must be maximum ${max} characters!`;
        }
    };

export const COOKIES_DEFAULT_CONFIG: any = {
    expires: 1 / 60,
    path: "/",
    domain: urls.hostname
};
