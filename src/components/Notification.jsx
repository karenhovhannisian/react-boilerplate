"use strict";

import {NOTIFICATION_TYPES} from "configs/constants";
import * as React from "react";

interface INotificationProps {
    type?: string;
    message?: string;
    clossable?: boolean;
    additionalText?: string;
}

const Notification: React.StatelessComponent<INotificationProps> = ({type, clossable, message, additionalText}) => {
    if (!message || !type || !NOTIFICATION_TYPES.includes(type)) {
        return null;
    }

    return (
            <div>
                <label className={`label notification label-${type}`}>
                    {message.replace(/^"(.*)"$/, "$1")}
                </label>
                <label className="additional_text">
                    {additionalText}
                </label>
            </div>
    );
};

export default Notification;
