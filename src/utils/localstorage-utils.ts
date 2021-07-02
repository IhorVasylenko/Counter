import {AppRootStateType} from "../store/store";

export const loadState = () => {
    try {
        const counterAsString = localStorage.getItem("counter");
        if (counterAsString === null) {
            return undefined;
        }
        return JSON.parse(counterAsString)
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: AppRootStateType) => {
    try {
        localStorage.setItem("counter", JSON.stringify(state));
    } catch {
        // ignore write errors
    }
};