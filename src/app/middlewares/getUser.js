"use strict";

import {getUserFailed, getUserSucceed} from "../modules/auth-user/AuthUserActions";
import {FORBIDDEN} from "configs/constants";
import {attemptGetUser} from "api/AuthApi";
import {Store} from "react-redux";

export default async function getUser(store: Store<any>): Promise<any> {
    const {dispatch} = store;
    const state: any = store.getState();

    try {
        if (!state.getIn(["userData", "loggedInUser"])) {
            const {data: user}: any = await attemptGetUser();
            await dispatch(getUserSucceed(user));
        }
    } catch ({response: {status, data: {error_description}}}) {
        if (status === FORBIDDEN) {
            await getUser(store);
        } else {
            await dispatch(getUserFailed());
        }
    }
};
