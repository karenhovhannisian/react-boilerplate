"use strict";

import {AES, DecryptedMessage, enc} from "crypto-js";

export const types: any = {
    JSON_ENCODE: "JSON_ENCODE",
    JSON_DECODE: "JSON_DECODE",
    ENCRYPT: "ENCRYPT",
    DECRYPT: "DECRYPT",
    URL_ENCODE: "URL_ENCODE"
};

function urlEncoded(data: any): string {
    let str: Array<string> = [];

    Object.keys(data).map(key => {
        if (data[key] !== null) {
            str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }
    });

    return str.join("&");
}

function jsonEncoded(data: any): string {
    try {
        return JSON.stringify(data);
    } catch (error) {
        return undefined;
    }
}

function jsonDecoded(data: string): any {
    try {
        return JSON.parse(data);
    } catch (error) {
        return undefined;
    }
}

function encrypted(data: any, secret: string): string {
    return AES.encrypt(data, secret).toString();
}

function decrypted(data: any, secret: string): string {
    const decrypted: DecryptedMessage = AES.decrypt(data.toString(), secret);
    return decrypted.toString(enc.Utf8);
}

export default function converter(data: any, type: string | Array<string>, options?: any): any {
    if (Array.isArray(type)) {
        let ret: any = data;

        type.forEach((singleType) => {
            if (Object.keys(types).includes(singleType)) {
                ret = converter(ret, singleType, options);
            }
        });

        return ret;
    } else {
        switch (type) {
            case types.JSON_ENCODE:
                return jsonEncoded(data);
            case types.JSON_DECODE:
                return jsonDecoded(data);
            case types.ENCRYPT:
                return options.secret ? encrypted(data, options.secret) : undefined;
            case types.DECRYPT:
                return options.secret ? decrypted(data, options.secret) : undefined;
            case types.URL_ENCODE:
                return urlEncoded(data);
            default:
                return data;
        }
    }
}
