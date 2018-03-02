"use strict";

import {mainReducer, mainRouter, mainSaga} from "../../app/services";
import {RouteConfig} from "react-router";
import configureStore from "../store/configureStore";
import {Store} from "react-redux";
import store from "configs/store";

export interface IAppConfigurations {
    store: Store<any>;
    routes: RouteConfig;
}

export default (): IAppConfigurations => {
    let configs: any = {
        store: {},
        routes: {}
    };

    configs.store = configureStore(mainReducer, mainSaga, store.storeMainParam);
    configs.routes = mainRouter(configs.store);

    return configs;
};
