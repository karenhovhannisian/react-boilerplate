"use strict";

import {Store} from "react-redux";

export default (reducers: Array<string>, cleaners: any, store: Store<any>) => {
    const state: any = store.getState(),
        {dispatch} = store;

    reducers.forEach(reducer => {
        const data: any = state.get(reducer);
        if (data) {
            const fields: any = data.get("fields");
            const errors: any = data.get("errors");
            const messages: any = data.get("messages");
            if (
                (fields && fields.size > 0) ||
                (errors && errors.size > 0) ||
                (messages && messages.size > 0)
            ) {
                dispatch(cleaners[reducer].clear());
            } else if (cleaners[reducer].always) {
                dispatch(cleaners[reducer].clear());
            }
        }
    });
};
