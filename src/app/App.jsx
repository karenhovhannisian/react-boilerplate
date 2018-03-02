"use strict";

import getAppConfigurations from "helpers/app/getAppConfigurations";
import {browserHistory, Router} from "react-router";
import {Provider} from "react-redux";
import * as React from "react";

export default (): React.ReactElement<any> => {

    const {store, routes} = getAppConfigurations();

    return (
        <Provider store={store}>
            <Router history={browserHistory} routes={routes}/>
        </Provider>
    );
};
