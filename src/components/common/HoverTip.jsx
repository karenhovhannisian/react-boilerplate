"use strict";

import * as React from "react";

interface IHoverTipProps {
    children: any;
}

const HoverTip: React.StatelessComponent<IHoverTipProps> = ({children}) => {
    return (
        <span className="fa fa-question-circle-o help-icon-tip" aria-hidden="true">
            <span className="help-content">{children}</span>
        </span>
    );
};

export default HoverTip;
