"use strict";

import * as React from "react";

export interface IFormIconProps {
    type?: string;
}

const FormIcon: React.StatelessComponent<IFormIconProps> = ({type}) => {
    return (
        <i className={`fa fa-exclamation-circle ${type ? (type + "-icon") : "hidden"}`} aria-hidden="true"></i>
    );
};

export default FormIcon;
