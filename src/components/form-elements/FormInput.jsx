"use strict";

import {ErrorMessage, FormGroup, FormIcon, Input} from "components/form-elements";
import * as React from "react";
import {Label, Button} from "reactstrap";
import HelpBlock from "components/common/HelpBlock";
import HoverTip from "components/common/HoverTip";

export interface IInput {
    name: string;
    type: string;
    label: string;
    options?: any;
    error: string;
    classType: string;
    percent?: number;
    removeIcon?: boolean;
    hint?: string;
    hoverTip?: string;
    linkButton?: {
        text: string;
        onClick: () => void;
    };
    textareaRows?: number;
    textAreaMaxLength?: number;
    disableDefaultOption?: boolean;
}

interface IFormInputProps {
    eventHandler: (event: any) => void;
    imageChangeHandler?: (event: any) => void;
    fields: any;
    details: IInput;
    noLabel?: boolean;
}

const FormInput: React.StatelessComponent<IFormInputProps> = ({eventHandler, fields, details, noLabel}) => {
    const {
        name, label, classType, error, type, removeIcon, hint, hoverTip, percent, options, disableDefaultOption,
        linkButton, textAreaMaxLength, textareaRows
    } = details;

    return (
        <FormGroup has={classType} groupClass={noLabel ? "no-label" : ""}>
            {noLabel ? "" : <Label for={name}>{label} {hoverTip && <HoverTip>{hoverTip}</HoverTip>}</Label>}
            {linkButton && linkButton.text && linkButton.onClick && <Button onClick={linkButton.onClick} className="btn-link">{linkButton.text}</Button>}
            <Input
                type={type}
                name={name}
                options={options}
                percent={percent}
                value={fields[name]}
                textareaRows={textareaRows}
                eventHandler={eventHandler}
                placeholder={noLabel ? label : ""}
                textAreaMaxLength={textAreaMaxLength}
                disableDefaultOption={disableDefaultOption}/>
            {removeIcon ? "" : <FormIcon type={classType}/>}
            <ErrorMessage>{error}</ErrorMessage>
            {hint && <HelpBlock>{hint}</HelpBlock>}
        </FormGroup>
    );
};

export default FormInput;
