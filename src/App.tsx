import React, {ChangeEvent, useCallback, useEffect} from 'react';
import './App.css';
import {Container, Paper} from "@material-ui/core";
import {MainScreen} from "./components/MainScreen";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {actions, AppInitialStateType} from "./store/appReducer";
import {Dispatch} from "redux";
import {SettingsScreen} from "./components/SettingsScreen";


function App() {

  const appData = useSelector<AppRootStateType, AppInitialStateType>(state => state.settingsScreen);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect( () => {
    dispatch(actions.resetCounterValueToMinValue(appData.minPossibleValue))
  }, [appData.mainDisplayIsShown] );

  // reset counter
  const resetCounter = useCallback(() => {
    dispatch(actions.resetCounterValueToMinValue(appData.minPossibleValue));
    dispatch(actions.changeResetButtonState(true));
    dispatch(actions.changeIncrementButtonState(false));
  }, [dispatch, appData.minPossibleValue]);

  // function to change screen state and reset button
  const buttonAndDisplayState = useCallback((display: boolean, button: boolean) => {
    dispatch(actions.changeDisplayState(display));
    dispatch(actions.changeResetButtonState(button));
    // check every time a new value is set
    dispatch(actions.changeIncrementButtonState(appData.maxPossibleValue === 0));
  }, [dispatch, appData.maxPossibleValue]);

  // change screen state to settings screen
  const changeDisplayAndButtonStateToSettings = useCallback(() => {
    buttonAndDisplayState(false, true)
  }, [buttonAndDisplayState]);

  // changing the screen state to the counter screen
  const changeDisplayAndButtonStateToCounter = useCallback(() => {
    buttonAndDisplayState(true, true)
  }, [buttonAndDisplayState]);

  // set button state
  const buttonStatus = (appData.minPossibleValue === 0 && appData.maxPossibleValue === 0);

  // increase counter
  const increase = useCallback(() => {
    dispatch(actions.incrementCounterValue())
  }, [dispatch]);

  // increasing the minimum value for the counter
  const incrementMinValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.incrementPossibleMinValue(e.currentTarget.valueAsNumber));
  }, [dispatch]);

  // increasing the maximum value for the counter
  const incrementMaxValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.incrementPossibleMaxValue(e.currentTarget.valueAsNumber));
  }, [dispatch]);


  return (
      <div className="App">
        <Container maxWidth={"xs"} fixed style={{padding: 0}}>
          <Paper elevation={7} style={{borderRadius: "20px"}}>
            {(appData.mainDisplayIsShown)
                ? <MainScreen
                    statusIncrementButton={appData.incrementButtonIsDisabled}
                    statusResetButton={appData.resetButtonIsDisabled}
                    counterValue={appData.countersValue}
                    increase={increase}
                    resetCounter={resetCounter}
                    changeDisplayAndButtonState={changeDisplayAndButtonStateToSettings}/>
                : <SettingsScreen
                    buttonStatus={buttonStatus}
                    maxAllowedCounterValue={appData.maxAllowedCounterValue}
                    changeDisplayAndButtonState={changeDisplayAndButtonStateToCounter}
                    incrementMinValue={incrementMinValue}
                    incrementMaxValue={incrementMaxValue}
                    minPossibleValue={appData.minPossibleValue}
                    maxPossibleValue={appData.maxPossibleValue}
                />
            }
          </Paper>
        </Container>
      </div>
  );
}

export default App