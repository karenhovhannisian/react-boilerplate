"use strict";

import FormInput, {IInput} from "./FormInput";
import * as React from "react";
import {Col} from "reactstrap";

export interface IFormProps {
    eventHandler: (event: React.FormEvent<HTMLInputElement>) => void;
    imageChangeHandler?: (event: React.FormEvent<HTMLInputElement>) => void;
    inputs: Array<IInput>;
    noLabel?: boolean;
    fields: any;
}

const Form: React.StatelessComponent<IFormProps> = ({eventHandler, fields, inputs, imageChangeHandler, noLabel}) => {
    return (
        <Col md="12" xs="12" sm="12">
            {inputs.map((input, index) =>
                <FormInput
                    key={index}
                    fields={fields}
                    details={input}
                    eventHandler={eventHandler}
                    imageChangeHandler={imageChangeHandler}
                    noLabel={noLabel}/>)}
        </Col>
    );
};

export default Form;
