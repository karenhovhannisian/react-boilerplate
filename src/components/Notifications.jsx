"use strict";

import * as React from "react";
import {List, Map} from "immutable";
import Notification from "./Notification";

export interface INotification extends Map<string, any> {
    type: string;
    message: string;
    additionalText?: string;
}

export interface INotificationsProps {
    messages: List<INotification>;
    clossable?: boolean;
}

export default class Notifications extends React.Component<INotificationsProps, undefined> {

    shouldComponentUpdate(nextProps: INotificationsProps): boolean {
        return !nextProps.messages.equals(this.props.messages);
    }

    render(): JSX.Element {

        const {messages} = this.props;
        return (
            messages.size > 0 ? <div>
                {messages.map((notification, index) =>
                    <Notification
                        key={index}
                        type={notification.get("type")}
                        message={notification.get("message")}
                        additionalText={notification.get("additionalText")}/>)}
            </div> : null
        );
    }
};
