import {ButtonComponent} from "./ButtonComponent";
import {AddCircle, Cached, Settings} from "@material-ui/icons";
import React from "react";
import {Grid} from "@material-ui/core";

export type MainScreenPropsType = {
    counterValue: number
    increase: () => void
    resetCounter: () => void
    buttonAndDisplayState: (display: boolean, button: boolean) => void
    statusResetButton: boolean
    statusIncrementButton: boolean
}


export function MainScreen(props: MainScreenPropsType) {
    const buttonAndDisplayState = () => {
        props.buttonAndDisplayState(false, true)
    }

    return (
        <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            style={{height: "350px", borderRadius: "20px", padding: "20px "}}
        >
            <Grid
                alignItems={"center"}
                item
                container
                style={{
                    height: "200px", width: "100%", fontSize: "100px", fontWeight: "bold", color: props.statusIncrementButton ? "red" : "black"
                }}
            >
                <div
                    color={props.statusResetButton ? "red" : "black"}
                    style={{margin: " 0 auto"}}
                >
                    {props.counterValue}
                </div>
            </Grid>
            <Grid
                item
                style={(props.statusIncrementButton) ? {paddingBottom: "12px"} : {paddingBottom: "33px"}}
            >
                <ButtonComponent icon={<AddCircle/>} value={'increment'} status={props.statusIncrementButton}
                                 callback={props.increase}/>
                <ButtonComponent icon={<Cached/>} value={'reset'} status={props.statusResetButton}
                                 callback={props.resetCounter}/>
                <ButtonComponent icon={<Settings/>} value={'settings'} status={false}
                                 callback={buttonAndDisplayState}/>
                {
                    (props.statusIncrementButton) ? (props.counterValue === 0) ? '' : <div style={{color: "red"}}>Max value.</div> : ''
                }
            </Grid>
        </Grid>
    )
}