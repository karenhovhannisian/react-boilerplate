"use strict";

import * as React from "react";

interface IFormGroupProps {
    children: any;
    has?: string;
    groupClass?: string;
}

const FormGroup: React.StatelessComponent<IFormGroupProps> = ({children, has, groupClass}) => {
    let groupExtraClass: string = groupClass ? groupClass : "";

    return (
        <div className={`form-group ${groupExtraClass} ${has ? ("has-" + has) : ""}`}>
            {children}
        </div>
    );
};

export default FormGroup;
