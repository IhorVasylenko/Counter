import {combineReducers, createStore} from "redux";
import { settingsScreenReducer} from "./appReducer";
import {loadState, saveState} from "../utils/localstorage-utils";
import { throttle } from "lodash";


const rootReducer = combineReducers({
    settingsScreen: settingsScreenReducer,
});

export const store = createStore(rootReducer, loadState());

store.subscribe(throttle(() => {
    saveState({
        settingsScreen: store.getState().settingsScreen
    });
}, 1000));


export type AppRootStateType = ReturnType<typeof rootReducer>;

// export type CommonActionTypeForApp = AppActionType;

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;




