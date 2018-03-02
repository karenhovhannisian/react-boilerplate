"use strict";

import * as React from "react";

export interface IInputGroupProps {
    icon: string;
    input: {
        value: string;
        placeholder: string;
        handleChange: (event: any) => void;
        handleKeyPress: (event: any) => void;
    };
}

const InputGroup: React.StatelessComponent<IInputGroupProps> = ({icon, input: {value, placeholder, handleChange, handleKeyPress}}) => {
    return (
        <div className="input-group">
            <span className="input-group-addon"><i className={`fa fa-${icon}`}></i></span>
            <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon1"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default InputGroup;
