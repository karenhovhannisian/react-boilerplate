"use strict";

import converter, {types} from "../form/typeConverter";
import store from "configs/store";

export default (state: any, storeKey: string) => {
    const encryptedState: string = converter(state.toJS(), [
        types.JSON_ENCODE,
        types.ENCRYPT
    ], {secret: store.cryptoSecret});
    localStorage.setItem(storeKey, encryptedState);
};
