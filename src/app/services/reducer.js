"use strict";

import userData, {IUserData} from "../modules/auth-user/AuthUserReducer";
import {combineReducers} from "redux-immutable";
import {Map} from "immutable";

export interface IMainStore extends Map<string, any> {
    userData: IUserData;
}

export default combineReducers({
    userData
});
