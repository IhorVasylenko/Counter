import React from 'react';
import {IconButton} from "@material-ui/core";

export type ButtonComponentPropsType = {
    value: string
    status: boolean
    callback: () => void
    icon: React.ComponentElement<any, any>
}

export function ButtonComponent (props: ButtonComponentPropsType) {
    return (
        <IconButton
            color={"primary"}
            onClick={props.callback}
            disabled={props.status}
        >
            {props.icon}
            {props.value}
        </IconButton>
    )
}
