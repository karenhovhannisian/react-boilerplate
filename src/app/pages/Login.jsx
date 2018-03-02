"use strict";

import {attemptSignIn} from "../modules/auth-user/AuthUserActions";
import {INVALID_EMAIL, LENGTH_REQUIRED, REQUIRED} from "configs/constants";
import Notifications from "components/Notifications";
import {PASSWORD_MIN_LENGTH, APP_MAIN_ROUTE} from "configs/constants";
import {isEmail, isEmpty, isLength} from "validator";
import {clone, cloneDeep, isEqual} from "lodash";
import selector from "../services/selector";
import {connect} from "react-redux";
import {Button, Row} from "reactstrap";
import {FormGroup} from "components/form-elements";
import * as React from "react";
import {MainContainer} from "components/common";
import Form from "components/form-elements/Form";
import {IInput} from "components/form-elements/FormInput";
import converter from "helpers/form/inputDetails";
import Notification from "components/Notification";


interface ILogInState {
    fields: {
        email: string;
        password: string;
    };
    errors: {
        email: string,
        password: string
    };
}

const logInState: ILogInState = {
    fields: {
        email: "",
        password: "",
    },
    errors: {
        email: "",
        password: ""
    }
};

class LogIn extends React.Component<any, ILogInState> {

    constructor(props: any) {
        super(props);

        this.state = cloneDeep(logInState);
    }

    redirectToDashboard(): void {
        this.props.router.push(APP_MAIN_ROUTE);
    }

    componentDidUpdate(prevProps: any): void {
        const { userFields, userErrors, loggedInUser } = this.props;
        if (!userFields.equals(prevProps.userFields) || !userErrors.equals(prevProps.userErrors)) {
            this.setState({
                errors: userErrors.toJS(),
                fields: userFields.toJS()
            });
        } else if (loggedInUser) {
            this.redirectToDashboard();
        }
    }

    handleChange({currentTarget: {name, value}}: React.FormEvent<HTMLInputElement>): void {
        let newState: any = cloneDeep(this.state);

        newState.errors[name] = this.validate(name, value);
        newState.fields[name] = value;

        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
    }

    validate(name: string, value: string): string {
        switch (name) {
            case "email":
                if (isEmpty(value)) {
                    return REQUIRED("Email");
                } else if (!isEmail(value)) {
                    return INVALID_EMAIL("Email");
                } else {
                    return "";
                }
            case "password":
                if (isEmpty(value)) {
                    return REQUIRED("Password");
                } else if (!isLength(value, PASSWORD_MIN_LENGTH)) {
                    return LENGTH_REQUIRED("Password", {min: PASSWORD_MIN_LENGTH});
                } else {
                    return "";
                }
        }
    }

    handleSubmit(): void {
        const {attemptSingIn} = this.props,
            data: any = clone(this.state.fields);

        let validationErrors: any = {};
        Object.keys(data).map(name => {
            const error: string = this.validate(name, data[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            this.setState({errors: validationErrors});
            return;
        }

        attemptSingIn(data);
    }

    render(): JSX.Element | null {

        const {userMessages} = this.props;
        let error: boolean = (this.state.errors.email === "") && (this.state.errors.password === "");
        const {location: {query}} = this.props;

        let inputs: Array<IInput> = [
            {
                name: "email",
                label: "Email",
                type: "email",
                error: "",
                classType: ""
            },
            {
                name: "password",
                label: "Password",
                type: "password",
                error: "",
                classType: ""
            }
        ];

        inputs.map(input => [input.error, input.classType] = converter(cloneDeep(this.state), input.name));

        return (
            <MainContainer>
                <Notification type={query && query.type} message={query && query.message}/>
                <Notifications messages={userMessages}/>
                <Row>
                    <Form
                        inputs={inputs}
                        fields={clone(this.state.fields)}
                        eventHandler={event => this.handleChange(event)}
                        noLabel={true}
                    />
                </Row>

                <FormGroup groupClass="form-submit-1">
                    <Button className="mc-btn btn-style-1" onClick={() => this.handleSubmit()}>
                        Login
                    </Button>
                </FormGroup>
            </MainContainer>
        );
    }
}

const mapStateToProps: any = state => selector(state);

const mapDispatchToProps: any = dispatch => {
    return {
        attemptSingIn: data => dispatch(attemptSignIn(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
