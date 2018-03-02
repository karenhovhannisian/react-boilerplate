"use strict";

import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import createLogger from "redux-logger";
import loadState from "./loadState";
import saveState from "./saveState";
import {Store} from "react-redux";
import {fromJS} from "immutable";
import {throttle} from "lodash";

export default (rootReducer, rootSaga, storeKey): Store => {

    let store: Store;

    const initialState: any = fromJS(loadState(storeKey));

    const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

    if (process.env.NODE_ENV !== "production") {
        const logger = createLogger({
            collapsed: false,
            stateTransformer: state => state.toJS()
        });

        store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, logger));
    } else {
        store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
    }

    sagaMiddleware.run(rootSaga);

    store.subscribe(throttle(() => {
        saveState(store.getState(), storeKey);
    }, 1000));

    return store;
};
