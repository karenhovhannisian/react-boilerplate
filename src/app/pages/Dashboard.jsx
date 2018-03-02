"use strict";

import selector from "../services/selector";
import {connect} from "react-redux";
import {attemptLogOutUser} from "../modules/auth-user/AuthUserActions";
import * as React from "react";

class Dashboard extends React.Component<any, undefined> {

    constructor(props: any) {
        super(props);
    }

    redirectToLogin(): void {
        const {loggedInUser} = this.props;

        if (!loggedInUser) {
            this.props.router.push("/log-in");
        }
    }

    componentWillMount(): void {
        this.redirectToLogin();
    }

    componentDidUpdate(prevProps: any): void {
        this.redirectToLogin();
    }

    render(): JSX.Element {
        const {loggedInUser} = this.props;
        return (
            <div>Dashboard</div>
        );
    }
}

const mapStateToProps: any = state => selector(state);

const mapDispatchToProps: any = dispatch => {
    return {
        attemptLogOutUser: () => dispatch(attemptLogOutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
