import React from 'react';
import {IconButton} from "@material-ui/core";


export type ButtonComponentPropsType = {
    value: string
    status: boolean
    icon: React.ComponentElement<any, any>
    callback: () => void
};

export const ButtonComponent: React.FC<ButtonComponentPropsType> =  (props) => {

    const {
        value,
        status,
        icon,
        callback,
    } = props;

    return (
        <IconButton color={"primary"} onClick={callback} disabled={status}>
            {icon}
            {value}
        </IconButton>
    );
}
