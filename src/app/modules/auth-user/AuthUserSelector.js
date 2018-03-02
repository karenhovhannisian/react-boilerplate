"use strict";

import {createSelector} from "reselect";
import {Map} from "immutable";

const userDataSelector: any = (state: Map<string, any>) => state.get("userData");

const messagesSelector: any = createSelector(
    userDataSelector, (userData: Map<string, any>) => userData.get("messages")
);

const fieldsSelector: any = createSelector(
    userDataSelector, (userData: Map<string, any>) => userData.get("fields")
);

const errorsSelector: any = createSelector(
    userDataSelector, (userData: Map<string, any>) => userData.get("errors")
);

const loggedInUserSelector: any = createSelector(
    userDataSelector, (userData: Map<string, any>) => userData.get("loggedInUser")
);

export default state => {
    return {
        loggedInUser: loggedInUserSelector(state),
        userMessages: messagesSelector(state),
        userFields: fieldsSelector(state),
        userErrors: errorsSelector(state),
    };
};
