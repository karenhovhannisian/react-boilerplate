import * as Actions from "../../app/modules/auth-user/AuthUserActions";
import {attemptSignIn} from "../../app/modules/auth-user/AuthUserSaga";
import * as Api from "api/AuthApi";
import {expectSaga} from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";



describe("Sign In functionality, ATTEMPT_SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILED actions", () => {
    const user: Actions.IUser = { fullName: "Test User" };
    const token: Actions.IToken = { access_token: "ABC", refresh_token: "EFG" };
    const loginRequest: object = { email: "user@example.com", password: "xSxNqARE4zroi6s2reF9l3Ei" };

    it("Should successfully login", () => {
        expectSaga(attemptSignIn, Actions.attemptSignIn(loginRequest))
            .provide([
                [matchers.call.fn(Api.attemptSignIn), { data: token }],
                [matchers.call.fn(Api.attemptGetUser), { data: user }],
            ])
            .put(Actions.clear())
            .put(Actions.signInSucceed({user, token}))
            .run();
    });

    it("Should handles errors", () => {
        const error: any = {response: {status: 401, data: {error_description: "Bad Credentials"}}};

        return expectSaga(attemptSignIn, Actions.attemptSignIn(loginRequest))
            .provide([
                [matchers.call.fn(Api.attemptSignIn), throwError(error)]
            ])
            .put(Actions.signInFailed(loginRequest, "Bad Credentials"))
            .run();
    });
});



