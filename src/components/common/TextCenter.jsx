"use strict";

import * as React from "react";

interface ITextCenterProps {
    children?: any;
    aClass?: string;
    style?: any;
}

const TextCenter: React.StatelessComponent<ITextCenterProps> = ({children, aClass, style = {}}) => {
    const additionalClass: string = aClass || "";
    return (
        <div className={`text-center ${additionalClass}`} style={style}>
            {children}
        </div>
    );
};

export default TextCenter;
