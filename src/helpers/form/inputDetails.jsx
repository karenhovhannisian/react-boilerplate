"use strict";

export default ({fields, errors}: { fields: any, errors: any }, name: string): Array<string> => {
    let error: string = "",
        type: string = "";

    if (errors[name] && errors[name].length > 0) {
        error = errors[name];
    }

    if (error && error.length > 0) {
        type = "error";
    } else if (fields[name] && !errors[0]) {
        type = "success";
    }

    return [error, type];
};
