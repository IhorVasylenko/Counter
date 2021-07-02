import {ButtonComponent} from "./ButtonComponent";
import React, {ChangeEvent} from "react";
import {Grid, TextField} from "@material-ui/core";
import {Settings} from "@material-ui/icons";


export type SettingsDisplayPropsType = {
    maxAllowedCounterValue: number
    buttonStatus: boolean
    minPossibleValue: number
    maxPossibleValue: number
    incrementMinValue: (e: ChangeEvent<HTMLInputElement>) => void
    incrementMaxValue: (e: ChangeEvent<HTMLInputElement>) => void
    changeDisplayAndButtonState: () => void
};

export const SettingsScreen: React.FC<SettingsDisplayPropsType> = React.memo((props) => {

    const {
        maxAllowedCounterValue,
        buttonStatus,
        minPossibleValue,
        maxPossibleValue,
        incrementMaxValue,
        incrementMinValue,
        changeDisplayAndButtonState,
    } = props;

    return (
        <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
            style={{height: "350px", borderRadius: "20px", padding: "20px "}}
        >
            <Grid
                item
                container
                style={{height: "200px", width: "100%"}}
            >
                <TextField
                    helperText={ (maxPossibleValue === maxAllowedCounterValue)
                        ? "Maximum allowed value reached."
                        : "Enter the maximum value for your counter"
                    }
                    color={ (maxPossibleValue === maxAllowedCounterValue)
                        ? "secondary"
                        : "primary"
                    }
                    error={
                        (maxPossibleValue === maxAllowedCounterValue)
                        || (maxPossibleValue === 0 && minPossibleValue === 0)
                    }
                    style={{width:"100%", margin: "0 10px"}}
                    size={"small"}
                    label={"max value"}
                    variant={"outlined"}
                    type="number"
                    value={maxPossibleValue}
                    onChange={incrementMaxValue}
                />
                <TextField
                    helperText={ (minPossibleValue === maxAllowedCounterValue - 1)
                        ? "Maximum allowed value reached."
                        : "Enter the minimum value for your counter"
                    }
                    color={ (minPossibleValue === maxAllowedCounterValue - 1)
                        ? "secondary"
                        : "primary"
                    }
                    error={
                        (minPossibleValue === maxAllowedCounterValue - 1)
                        || (maxPossibleValue === 0 && minPossibleValue === 0)
                    }
                    style={{width:"100%", margin: "0 10px"}}
                    size={"small"}
                    label={"min value"}
                    variant={"outlined"}
                    type="number"
                    value={minPossibleValue}
                    onChange={incrementMinValue}
                />
            </Grid>
            <Grid
                item
                style={(buttonStatus) ? {paddingBottom: "15px"} : {paddingBottom: "33px"}}
            >
                <ButtonComponent
                    icon={<Settings />}
                    value={'set'}
                    status={buttonStatus}
                    callback={changeDisplayAndButtonState}
                />
                {
                    (buttonStatus)
                        ? <div style={{color: "red"}}>Please enter the max and min values for your counter.</div>
                        : ''
                }
            </Grid>
        </Grid>
    );
})

