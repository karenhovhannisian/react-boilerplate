"use strict";

import {IndexRoute, Route, RouteConfig} from "react-router";
import {clear} from "../modules/auth-user/AuthUserActions";
import NotFound from "components/NotFound";
import reset from "helpers/store/cleanReducers";
import getUser from "../middlewares/getUser";
import {IMainStore} from "./reducer";
import * as Pages from "../pages";
import {Store} from "react-redux";
import * as React from "react";
import userIsSet from "../middlewares/userIsSet";
import checkLoggedIn from "../middlewares/checkLoggedIn";
import {ACCESS_TOKEN} from "configs/constants";

export default (store: Store<IMainStore>): RouteConfig => {

    const resetMiddleware: any = () => {
        scroll(0, 0);

        const reducers: Array<string> = ["userData"];
        const cleaners: any = {
            "userData": {
                clear: clear
            }
        };

        reset(reducers, cleaners, store);
    };

    const onEnterMiddleware: any = async (nextState, replace, cb) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            await getUser(store);
        }

        scroll(0, 0);
        cb();
    };

    const userIsSetMiddleware: any = async (nextState, replace, cb) => {
        await userIsSet(store);
        cb();
    };

    const userIsLoggedIn: any = async (nextState, replace, cb) => {
        await checkLoggedIn(store);
        cb();
    };

    return (
        <Route path="/" component={Pages.Layout} onEnter={onEnterMiddleware} onChange={resetMiddleware}>
            <IndexRoute component={Pages.Home}/>
            <Route path="log-in" component={Pages.LogIn} onEnter={userIsLoggedIn}/>
            <Route path="dashboard" component={Pages.Dashboard} onEnter={userIsSetMiddleware}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
};
