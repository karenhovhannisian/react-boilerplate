"use strict";

import authUserSaga from "../modules/auth-user/AuthUserSaga";

export default function*(): any {
    yield [
        authUserSaga()
    ];
};
