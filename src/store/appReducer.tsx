import {InferActionType} from "./store";


export type CounterValueType = {
    minPossibleValue: number
    maxPossibleValue: number
};

const counterValue: CounterValueType = {
    minPossibleValue: 0,
    maxPossibleValue: 0,
};

const appInitialState = {
    maxAllowedCounterValue: 9,
    countersValue: 0,
    value: counterValue,
    maimDisplayIsShown: true,
    resetButtonIsDisabled: true,
    incrementButtonIsDisabled: true,
};

export type AppInitialStateType = typeof appInitialState;
export type AppActionType = InferActionType<typeof actions>;

export const settingsScreenReducer = (
    state: AppInitialStateType = appInitialState,
    action: AppActionType,
): AppInitialStateType => {
    switch (action.type) {
        case ("counter/CHANGE-DISPLAY-STATE"):
            return {
                ...state, maimDisplayIsShown: action.displayState
            };
        case ("counter/CHANGE-RESET-BUTTON-STATE"):
            return {
                ...state, resetButtonIsDisabled: action.buttonState
            };
        case ("counter/CHANGE-INCREMENT-BUTTON-STATE"):
            return {
                ...state, incrementButtonIsDisabled: action.buttonState
            };
        case ("counter/INCREMENT-COUNTER-VALUE"):
            return {
                ...state, countersValue: action.newValue
            };
        case ("counter/INCREMENT-POSSIBLE-VALUE"):
            return {
                ...state, value: {...state.value, [action.title]: action.newValue}
            };
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
    incrementCounterValue: (newValue: number) => ({
        type: "counter/INCREMENT-COUNTER-VALUE",
        newValue,
    } as const ),
    incrementPossibleValue: (title: string, newValue: number) => ({
        type: "counter/INCREMENT-POSSIBLE-VALUE",
        title,
        newValue,
    } as const ),
};