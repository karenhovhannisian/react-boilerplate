"use strict";

import * as React from "react";

interface IHelpBlockProps {
    children: any;
    small?: boolean;
    aClass?: string;
}

const HelpBlock: React.StatelessComponent<IHelpBlockProps> = ({children, small, aClass}) => {
    const additionalClass: string = aClass || "";
    return (
        small ?
            <small className={`help-block ${additionalClass}`}>{children}</small> :
            <span className={`help-block ${additionalClass}`}>{children}</span>
    );
};

export default HelpBlock;
