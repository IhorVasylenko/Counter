import React, {ChangeEvent, useCallback} from 'react';
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


  //сброс счетчика
  const resetCounter = useCallback(() => {
    dispatch(actions.incrementCounterValue(appData.value.minPossibleValue));
    dispatch(actions.changeResetButtonState(true));
    dispatch(actions.changeIncrementButtonState(false));
  }, [dispatch]);


  const buttonAndDisplayState = (display: boolean, button: boolean) => {
    dispatch(actions.changeDisplayState(display));
    dispatch(actions.changeResetButtonState(button));
    //проверка при каждой установке нового значения
    dispatch(actions.changeIncrementButtonState(appData.value.maxPossibleValue === 0)) ;
  };


  //изменение состояния экрана на экран settings
  const changeDisplayAndButtonStateToSettings = useCallback(() => {
    buttonAndDisplayState(false, true)
  }, []);

  //изменение состояния экрана на экран counter
  const changeDisplayAndButtonStateToCounter = useCallback(() => {
    buttonAndDisplayState(true, true)
  }, []);


  //состояние кнопки set
  const buttonStatus = (appData.value.minPossibleValue === 0 && appData.value.maxPossibleValue === 0);


  // увеличение счетчика
  const increase = useCallback(() => {
    let newCounterValue;
    if (appData.value.minPossibleValue < appData.value.maxPossibleValue) {
      if (appData.value.minPossibleValue + 1 === appData.value.maxPossibleValue) {        //блокировка кнопки увеличения
        dispatch(actions.changeIncrementButtonState(true))
      }
      newCounterValue = appData.value.minPossibleValue + 1
    } else {
      newCounterValue = appData.value.maxPossibleValue
    }
    dispatch(actions.incrementCounterValue(newCounterValue))
    dispatch(actions.changeResetButtonState(false));
  }, [dispatch]);

  // увеличение минимального значения для счетчика
  const incrementMinValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newMinValue = JSON.parse(e.currentTarget.value)
    if (newMinValue < 0) {
      dispatch(actions.incrementPossibleValue("minPossibleValue", 0));
    } else if (newMinValue >= appData.maxAllowedCounterValue ) {
      dispatch(actions.incrementPossibleValue("minPossibleValue", appData.maxAllowedCounterValue - 1));
    } else if (appData.value.maxPossibleValue === 0 || newMinValue === appData.value.maxPossibleValue) {
      dispatch(actions.incrementPossibleValue("minPossibleValue", newMinValue));
      dispatch(actions.incrementPossibleValue("maxPossibleValue", newMinValue + 1));
    } else {
      dispatch(actions.incrementPossibleValue("minPossibleValue", newMinValue));
    }
  }, [dispatch]);

  // увеличение максимального значения для счетчика
  const incrementMaxValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newMaxValue = JSON.parse(e.currentTarget.value);
    if (newMaxValue <= 0) {
      dispatch(actions.incrementPossibleValue("minPossibleValue", 0));
      dispatch(actions.incrementPossibleValue("maxPossibleValue", 0));
    } else if (newMaxValue >= appData.maxAllowedCounterValue) {
      dispatch(actions.incrementPossibleValue("maxPossibleValue", appData.maxAllowedCounterValue));
    } else if (newMaxValue === appData.value.minPossibleValue) {
      dispatch(actions.incrementPossibleValue("minPossibleValue", newMaxValue - 1));
      dispatch(actions.incrementPossibleValue("maxPossibleValue", newMaxValue));
    } else {
      dispatch(actions.incrementPossibleValue("maxPossibleValue", newMaxValue));
    }
  }, [dispatch]);



  return (
      <div className="App">
        <Container maxWidth={"xs"} fixed style={{padding: 0}}>
          <Paper elevation={7} style={{borderRadius: "20px"}}>
            {(appData.maimDisplayIsShown)
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
                    minPossibleValue={appData.value.minPossibleValue}
                    maxPossibleValue={appData.value.maxPossibleValue}
                />
            }
          </Paper>
        </Container>
      </div>
  );
}

export default App


/*import React, {useState} from 'react';
import './App.css';
import {Container, Paper} from "@material-ui/core";
import {MainScreen} from "./components/MainScreen";
import {SettingsDisplayContainer} from "./components/SettingsScreenContainer";


const appData = {
  minimumSetCounterValue: 0,
  maximumSetCounterValue: 0,
};


const getLocalStorage = (title: string) => {
  let valueAsString = localStorage.getItem(title);

  if (valueAsString) {
    return JSON.parse(valueAsString)
  } else return 0
};


const setToLocalStorage = (title: string, item: any) => {
  localStorage.setItem(title, JSON.stringify(item))
};


function App() {
  //переменная для ограничения максимального значения счетчика
  const maxAllowedCounterValue = 9;

  //мин стартовое значение из настроек
  appData["minimumSetCounterValue"] = getLocalStorage('minCounterValue');
  //макс стартовое значение из настроек
  appData["maximumSetCounterValue"] = getLocalStorage('maxCounterValue');

  //значение счетчика
  const [minCounterValue, setMinCounterValue] = useState(appData["minimumSetCounterValue"]);
  const [maxCounterValue, setMaxCounterValue] = useState(appData["maximumSetCounterValue"]);

  //перекдючение экранов
  const [display, setDisplay] = useState(true);

  //состояние кнопки сброса
  const [resetButtonState, setResetButtonState] = useState(true);

  //состояние кнопки увеличения
  //при старте проверка на наличие значения в localstorage
  const [incrementButtonState, setIncrementButtonState] = useState(appData["maximumSetCounterValue"] === 0);

  //обновление стартового значения счетчика при изминении настройки мин значения
  const setNewStartCounterValue = (newStartValue: number) => setMinCounterValue(newStartValue);
  const setNewMaxCounterValue = (newMaxValue: number) => setMaxCounterValue(newMaxValue);

  // увеличение счетчика
  const increase = () => {
    let newCounterValue;
    if (minCounterValue < appData["maximumSetCounterValue"]) {
      if (minCounterValue + 1 === appData["maximumSetCounterValue"]) {        //блокировка кнопки увеличения (костыль)
        setIncrementButtonState(true)
      }
      newCounterValue = minCounterValue + 1
    } else {
      newCounterValue = appData["maximumSetCounterValue"]
    }
    setMinCounterValue(newCounterValue);
    setResetButtonState(false);
  };

  //сброс счетчика
  const resetCounter = () => {
    setMinCounterValue(appData["minimumSetCounterValue"]);
    setResetButtonState(true);
    setIncrementButtonState(false);
  };

  const buttonAndDisplayState = (display: boolean, button: boolean) => {
    setDisplay(display);
    setResetButtonState(button);

    //проверка при каждой установке нового значения
    setIncrementButtonState(appData["maximumSetCounterValue"] === 0);
  };


  //изминение дисплея на настройки
  const changeDisplayAndButtonStateToSettings = () => {
    buttonAndDisplayState(false, true)
  };

  return (
      <div className="App">
        <Container maxWidth={"xs"} fixed style={{padding: 0}}>
          <Paper elevation={7} style={{borderRadius: "20px"}}>
            {(display)
                ? <MainScreen
                    statusIncrementButton={incrementButtonState}
                    statusResetButton={resetButtonState}
                    counterValue={minCounterValue}
                    increase={increase}
                    resetCounter={resetCounter}
                    changeDisplayAndButtonState={changeDisplayAndButtonStateToSettings}/>
                : <SettingsDisplayContainer
                    minCounterValue={minCounterValue}
                    maxCounterValue={maxCounterValue}
                    maxAllowedCounterValue={maxAllowedCounterValue}
                    buttonAndDisplayState={buttonAndDisplayState}
                    setNewStartCounterValue={setNewStartCounterValue}
                    setNewMaxCounterValue={setNewMaxCounterValue}
                    getLocalStorage={getLocalStorage}
                    setToLocalStorage={setToLocalStorage}
                />
            }
          </Paper>
        </Container>
      </div>
  );
}

export default App
*/