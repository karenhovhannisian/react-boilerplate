"use strict";

import { Row, Col} from "reactstrap";
import * as React from "react";

export interface IInputProps {
    id?: string;
    type: string;
    name?: string;
    eventHandler?: (event: any) => void;
    percent?: number;
    options?: any;
    disableDefaultOption?: boolean;
    value?: string;
    multiple?: boolean;
    placeholder?: string;
    textareaRows?: number;
    textAreaMaxLength?: number;
}

const Input: React.StatelessComponent<IInputProps> = (props) => {
    const {
            type, name, value, options, disableDefaultOption, eventHandler,
            placeholder, textareaRows, textAreaMaxLength
        } = props,
        inputOptions: any = options && options.size > 0 && options.toJS() || {};

    let inputElement: React.ReactElement<any>, selectOptions: any = [];

    switch (type) {
        case "text":
        case "password":
        case "email":
        case "number":
            inputElement = <input
                placeholder={placeholder}
                className="form-control"
                onChange={eventHandler}
                onBlur={eventHandler}
                value={value || ""}
                type={type}
                name={name}
                id={name}/>;
            break;
        case "textarea":
            inputElement = <textarea
                placeholder={placeholder}
                className="form-control"
                onChange={eventHandler}
                onBlur={eventHandler}
                value={value || ""}
                maxLength={textAreaMaxLength}
                name={name}
                id={name}
                rows={textareaRows || 3}/>;
            break;
        case "select":
            inputElement = <select
                placeholder={placeholder}
                className="form-control"
                onChange={eventHandler}
                onBlur={eventHandler}
                value={value || ""}
                name={name}
                id={name}>
                <option value={""} disabled={disableDefaultOption}>Select an option</option>
                {inputOptions && Array.isArray(inputOptions) ? inputOptions.map((option: any, index: number) => {
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                  }) : ''}
            </select>;
            break;
        case "radio":
            inputElement = <Row>
                <Col xs="12" className="member-position">
                    <span className="displayB">{placeholder}</span>
                    {inputOptions.map((inputOption, index) =>
                        <div key={index} className="form-item form-radio radio-style pull-left pr15">
                            <input type="radio"
                                   id={inputOption.id}
                                   name={inputOption.name}
                                   value={inputOption.value}
                                   checked={inputOption.value === value}
                                   onChange={eventHandler}/>
                            <label htmlFor={inputOption.id}>
                                <i className="icon-radio"></i>
                                {inputOption.label}
                            </label>
                        </div>)}
                </Col>
            </Row>;
            break;
    }

    return <span>
        {inputElement}
    </span>;
};

export default Input;
