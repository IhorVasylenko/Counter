import {ButtonComponent} from "./ButtonComponent";
import {AddCircle, Cached, Settings} from "@material-ui/icons";
import React from "react";
import {Grid} from "@material-ui/core";


export type MainScreenPropsType = {
    counterValue: number
    statusResetButton: boolean
    statusIncrementButton: boolean
    increase: () => void
    resetCounter: () => void
    changeDisplayAndButtonState: () => void
};

export const MainScreen: React.FC<MainScreenPropsType> = React.memo((props) => {

    const {
        counterValue,
        statusResetButton,
        statusIncrementButton,
        increase,
        resetCounter,
        changeDisplayAndButtonState,
    } = props;

    return (
        <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            style={{height: "350px", borderRadius: "20px", padding: "20px ",}}>
            <Grid
                alignItems={"center"}
                item
                container
                style={{
                    height: "200px",
                    width: "100%",
                    fontSize: "100px",
                    fontWeight: "bold",
                    color: statusIncrementButton ? "red" : "black",
                }}>
                <div color={statusResetButton ? "red" : "black"} style={{margin: " 0 auto",}}>
                   {counterValue}
                </div>
            </Grid>
            <Grid
                item
                style={(statusIncrementButton) ? {paddingBottom: "12px",} : {paddingBottom: "33px",}}>
                <ButtonComponent icon={<AddCircle/>} value={'increment'} status={statusIncrementButton}
                                 callback={increase}/>
                <ButtonComponent icon={<Cached/>} value={'reset'} status={statusResetButton}
                                 callback={resetCounter}/>
                <ButtonComponent icon={<Settings/>} value={'settings'}
                                 /*при необходимости можно заблокировать кнопку настроек до конца выполнения задачи*/
                                 status={props.statusResetButton ? !props.statusResetButton: props.statusResetButton}
                                 callback={changeDisplayAndButtonState}/>
                {
                    (statusIncrementButton)
                        ? (counterValue === 0) ? ''
                        : <div style={{color: "red",}}>Max value</div>
                        : ''
                }
            </Grid>
        </Grid>
    );
})