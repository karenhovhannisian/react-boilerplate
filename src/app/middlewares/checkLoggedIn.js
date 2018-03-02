"use strict";

import {browserHistory} from "react-router";
import {Store} from "react-redux";

export default (store: Store<any>) => {
    const state: any = store.getState();
    if (state.getIn(["userData", "loggedInUser"])) {
        browserHistory.push("/dashboard");
    }
};
