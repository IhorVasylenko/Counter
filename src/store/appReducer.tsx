import {InferActionType} from "./store";

export const appInitialState = {
    maxAllowedCounterValue: 9,
    countersValue: 0,
    minPossibleValue: 0,
    maxPossibleValue: 0,
    mainDisplayIsShown: true,
    resetButtonIsDisabled: true,
    incrementButtonIsDisabled: true,
};

export type AppInitialStateType = typeof appInitialState;
export type AppActionType = InferActionType<typeof actions>;

export const settingsScreenReducer = (state: AppInitialStateType = appInitialState,
                                      action: AppActionType,): AppInitialStateType => {
    switch (action.type) {
        case ("counter/CHANGE-DISPLAY-STATE"):
            return {
                ...state, mainDisplayIsShown: action.displayState
            };
        case ("counter/CHANGE-RESET-BUTTON-STATE"):
            return {
                ...state, resetButtonIsDisabled: action.buttonState
            };
        case ("counter/CHANGE-INCREMENT-BUTTON-STATE"):
            return {
                ...state, incrementButtonIsDisabled: action.buttonState
            };
        case ("counter/RESET-COUNTER-VALUE-TO-MIN-VALUE"):
            return {
                ...state, countersValue: action.value
            };
        case ("counter/INCREMENT-COUNTER-VALUE"):
            let newCounterValue = state.countersValue
            if (state.countersValue < state.maxPossibleValue) {
                if (state.countersValue === state.maxPossibleValue - 1) {
                    return {...state, countersValue: state.maxPossibleValue, incrementButtonIsDisabled: true}
                }
                newCounterValue  += 1
            }
            return {...state, countersValue: newCounterValue, resetButtonIsDisabled: false}
        case ("counter/INCREMENT-POSSIBLE-MIN-VALUE"):
            if (action.value < 0) {
                return {...state, minPossibleValue: 0}
            } else if (action.value >= state.maxAllowedCounterValue ) {
                return {...state, minPossibleValue: state.maxAllowedCounterValue - 1}
            } else if (state.maxPossibleValue === 0 || action.value === state.maxPossibleValue) {
                return {...state, minPossibleValue: action.value, maxPossibleValue: action.value + 1}
            } else {
                return {...state, minPossibleValue: action.value}
            }
        case ("counter/INCREMENT-POSSIBLE-MAX-VALUE"):
            if (action.value <= 0) {
                return {...state, minPossibleValue: 0, maxPossibleValue: 0}
            } else if (action.value >= state.maxAllowedCounterValue) {
                return {...state, maxPossibleValue: state.maxAllowedCounterValue}
            } else if (action.value === state.minPossibleValue) {
                return {...state, minPossibleValue: action.value - 1, maxPossibleValue: action.value}
            } else {
                return {...state, maxPossibleValue: action.value}
            }
        default:
            return state;
    }
};

export const actions = {
    changeDisplayState: (displayState: boolean) => ({
        type: "counter/CHANGE-DISPLAY-STATE",
        displayState,
    } as const ),
    changeResetButtonState: (buttonState: boolean) => ({
        type: "counter/CHANGE-RESET-BUTTON-STATE",
        buttonState,
    } as const ),
    changeIncrementButtonState: (buttonState: boolean) => ({
        type: "counter/CHANGE-INCREMENT-BUTTON-STATE",
        buttonState,
    } as const ),
    resetCounterValueToMinValue: (value: number) => ({
        type: "counter/RESET-COUNTER-VALUE-TO-MIN-VALUE",
        value,
    } as const ),
    incrementCounterValue: () => ({
        type: "counter/INCREMENT-COUNTER-VALUE",
    } as const ),
    incrementPossibleMinValue: (value: number) => ({
        type: "counter/INCREMENT-POSSIBLE-MIN-VALUE",
        value,
    } as const ),
    incrementPossibleMaxValue: (value: number) => ({
        type: "counter/INCREMENT-POSSIBLE-MAX-VALUE",
        value,
    } as const ),
};