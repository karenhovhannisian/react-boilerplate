"use strict";

import * as React from "react";
import {Link} from "react-router";

const NotFound: React.StatelessComponent<undefined> = () => {
    return (
        <div className="fixed-center">
            <div className="logo-wrapper">
                <Link to="/">
                    <img src="img/sitelogo.svg" alt="logo" />
                </Link>
            </div>
            <div className="ui text">
                <h1 className="ui header">
                    Not Found
                </h1>
            </div>
        </div>
    );
};

export default NotFound;
