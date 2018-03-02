"use strict";

import selector from "../services/selector";
import {connect} from "react-redux";
import * as React from "react";
import {Link} from "react-router";


class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ul>
                <li><Link to="/log-in">Login</Link></li>
            </ul>
        );
    }
}

const mapStateToProps = state => selector(state);

export default connect(mapStateToProps)(Home);
