"use strict";

import {attemptLogOutUser} from "../modules/auth-user/AuthUserActions";
import { LayoutDiv } from "../../components";
import selector from "../services/selector";
import {connect} from "react-redux";
import * as React from "react";
import "sass/vendor.scss";


class Layout extends React.Component<any, undefined> {
    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {
        const {children} = this.props;

        return (
            <LayoutDiv>
                {children}
            </LayoutDiv>
        );
    }
}

const mapStateToProps: any = state => selector(state);

const mapDispatchToProps: any = dispatch => {
    return {
        attemptLogOutUser: () => dispatch(attemptLogOutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
