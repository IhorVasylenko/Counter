import {AppRootStateType} from "../store/store";

export const loadState = () => {
    try {
        const minValue = localStorage.getItem("minPossibleValue", );
        const maxValue = localStorage.getItem("maxPossibleValue", );
        if (minValue === null || maxValue === null) {
            return undefined;
        }
        return (JSON.parse(minValue), JSON.parse(maxValue));
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: AppRootStateType) => {
    try {
        localStorage.setItem("minPossibleValue", JSON.stringify(state.settingsScreen.value.minPossibleValue));
        localStorage.setItem("maxPossibleValue", JSON.stringify(state.settingsScreen.value.maxPossibleValue));
    } catch {
        // ignore write errors
    }
};