"use strict";

import * as React from "react";

export interface ILayoutDivProps {
    children: any;
    idName?: string;
    style?: any;
}

const LayoutDiv: React.StatelessComponent<ILayoutDivProps> = ({children, idName, style}) => {
    return (
        <div id={idName || ""} style={style || {}}>
            {children}
        </div>
    );
};

export default LayoutDiv;
