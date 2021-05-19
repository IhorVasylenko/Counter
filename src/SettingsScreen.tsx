import {ButtonComponent} from "./ButtonComponent";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import {Settings} from "@material-ui/icons";

export type SettingsDisplayPropsType = {
    buttonAndDisplayState: (display: boolean, button: boolean) => void
    setNewStartCounterValue: (newStartValue: number) => void
    maxAllowedCounterValue: number
    getLocalStorage: (title: string) => number
    setToLocalStorage: (title: string, item: any) => void
}


export function SettingsScreen(props: SettingsDisplayPropsType) {
    const [value, setValue] = useState({maxValue: 0, minValue: 0})
    const buttonStatus = (value["maxValue"] === 0 && value["minValue"] === 0)

    /*const getLocalStorage = (title: string) => {
        let valueAsString = localStorage.getItem(title)
        if (valueAsString) {
            return JSON.parse(valueAsString)
        }
    }
    const setToLocalStorage = (title: string, item: string) => {
        localStorage.setItem(title, JSON.stringify(value[item]))
    }*/

    useEffect( () => {
        let newMaxValue = props.getLocalStorage('maxCounterValue')
        let newMinValue = props.getLocalStorage('minCounterValue')
        setValue({maxValue: newMaxValue, minValue: newMinValue})
        props.setNewStartCounterValue(newMinValue)
    }, [])
    useEffect( () => {
        props.setToLocalStorage('minCounterValue', value["minValue"])
        props.setToLocalStorage('maxCounterValue', value["maxValue"])
        props.setNewStartCounterValue(value["minValue"])
    }, [value])

    const incrementMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        let newMaxValue = JSON.parse(e.currentTarget.value)
        if (newMaxValue <= 0) {
            setValue({maxValue: 0, minValue: 0})
        } else if (newMaxValue >= props.maxAllowedCounterValue) {
            setValue({...value, maxValue: props.maxAllowedCounterValue })
        } else if (newMaxValue === value["minValue"]) {
            setValue({maxValue: newMaxValue, minValue: newMaxValue - 1})
        } else {
            setValue({...value, maxValue: newMaxValue})
        }
    }
    const incrementMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        let newMinValue = JSON.parse(e.currentTarget.value)
        if (newMinValue <= 0) {
            setValue({...value, minValue: 0})
        } else if (value["maxValue"] === 0) {
            setValue({maxValue: newMinValue + 1, minValue: newMinValue})
        } else if (newMinValue === props.maxAllowedCounterValue) {
            setValue({...value, minValue: props.maxAllowedCounterValue - 1 })
        } else if (newMinValue === value["maxValue"]) {
            setValue({maxValue: newMinValue + 1, minValue: newMinValue})
        } else {
            setValue({...value, minValue: newMinValue})
        }
    }


    const buttonAndDisplayState = () => {
        props.buttonAndDisplayState(true, false)
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
                item
                container
                style={{height: "200px", width: "100%"}}
            >
                <TextField
                    helperText={ (value["maxValue"] === props.maxAllowedCounterValue)
                        ? "Maximum allowed value reached."
                        : "Enter the maximum value for your counter"
                    }
                    color={ (value["maxValue"] === props.maxAllowedCounterValue)
                        ? "secondary"
                        : "primary"
                    }
                    error={
                        (value["maxValue"] === props.maxAllowedCounterValue)
                        || value["maxValue"] === 0 && value["minValue"] === 0
                    }
                    style={{width:"100%", margin: "0 10px"}}
                    size={"small"}
                    label={"max value"}
                    variant={"outlined"}
                    type="number"
                    value={value["maxValue"]}
                    onChange={incrementMaxValue}
                />
                <TextField
                    helperText={ (value["minValue"] === props.maxAllowedCounterValue - 1)
                        ? "Maximum allowed value reached."
                        : "Enter the minimum value for your counter"
                    }
                    color={ (value["minValue"] === props.maxAllowedCounterValue - 1)
                        ? "secondary"
                        : "primary"
                    }
                    error={
                        (value["minValue"] === props.maxAllowedCounterValue - 1)
                        || value["maxValue"] === 0 && value["minValue"] === 0
                    }
                    style={{width:"100%", margin: "0 10px"}}
                    size={"small"}
                    label={"min value"}
                    variant={"outlined"}
                    type="number"
                    value={value["minValue"]}
                    onChange={incrementMinValue}
                />
            </Grid>
            <Grid
                item
                style={(buttonStatus) ? {paddingBottom: "12px"} : {paddingBottom: "33px"}}
            >
                <ButtonComponent
                    icon={<Settings />}
                    value={'set'}
                    status={buttonStatus}
                    callback={buttonAndDisplayState}
                />
                {
                    (buttonStatus)
                        ? <div style={{color: "red"}}>Please enter the max and min values for your counter.</div>
                        : ''
                }
            </Grid>
        </Grid>
    )
}

