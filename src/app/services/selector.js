"use strict";

import AuthUserSelector from "../modules/auth-user/AuthUserSelector";

export default (state, all = true, modules = []) => {
    if (all) {
        return {
            ...AuthUserSelector(state)
        };
    }

    let stateInProps: any = {};

    if (modules.includes("auth-user")) {
        stateInProps = Object.assign({}, stateInProps, {...AuthUserSelector(state)});
    }

    return stateInProps;
};
