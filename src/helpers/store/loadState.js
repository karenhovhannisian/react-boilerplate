"use strict";

import converter, {types} from "../form/typeConverter";
import store from "configs/store";

export default (storeKey: string) => {
    const storeEncrypted: string = localStorage.getItem(storeKey);
    if (!storeEncrypted) {
        return;
    }

    return converter(storeEncrypted, [types.DECRYPT, types.JSON_DECODE], {secret: store.cryptoSecret});
};
