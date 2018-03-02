"use strict";

import * as React from "react";

export interface IErrorMessageProps {
    children: string;
}

const ErrorMessage: React.StatelessComponent<IErrorMessageProps> = ({children}) => {
    return (
        <p className={`error-message ${!children && "hidden"}`}>
            {children && children.replace(/^"(.*)"$/, "$1")}
        </p>
    );
};

export default ErrorMessage;
