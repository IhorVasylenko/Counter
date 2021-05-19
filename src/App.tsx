import React, {useState} from 'react';
import './App.css';
import {SettingsScreen} from "./SettingsScreen";
import {Container, Paper} from "@material-ui/core";
import {MainScreen} from "./MainScreen";


const appData = {
  minimumSetCounterValue: 0,
  maximumSetCounterValue: 0
}
const getLocalStorage = (title: string) => {
  let valueAsString = localStorage.getItem(title)
  if (valueAsString) {
    return JSON.parse(valueAsString)
  }
}
const setToLocalStorage = (title: string, item: any) => {
  localStorage.setItem(title, JSON.stringify(item))
}


function App() {
  const maxAllowedCounterValue = 9                        //переменная для ограничения максимального значения счетчика

  appData["minimumSetCounterValue"] = getLocalStorage('minCounterValue')     //мин стартовое значение из настроек
  appData["maximumSetCounterValue"] = getLocalStorage('maxCounterValue')    //макс стартовое значение из настроек

  const [display, setDisplay] = useState(true)                                         //перекдючение экранов
  const [counterValue, setCounterValue] = useState(appData["minimumSetCounterValue"])              //значение счетчика    //defStor.min
  const [resetButtonState, setResetButtonState] = useState(true)                    //состояние кнопки сброса
  const [incrementButtonState, setIncrementButtonState] = useState(                      //состояние кнопки увеличения
      appData["maximumSetCounterValue"] === 0         //при старте проверка на наличие значения в localstorage
  )



  // useEffect(() => {
  //     //useEffect getFromLOcalStor
  //     return () => {
  //         //setTolocalStor
  //     }
  // },[])

  const setNewStartCounterValue = (newStartValue: number) => {                 //обновление стартового значения счетчика при изминении настройки мин значения
    setCounterValue(newStartValue)
  }

  const increase = () => {                                                                      // увеличение счетчика
    let newCounterValue
    if (counterValue < appData["maximumSetCounterValue"]) {
      if (counterValue + 1 == appData["maximumSetCounterValue"]) {        //блокировка кнопки увеличения (костыль)
        setIncrementButtonState(true)
      }
      newCounterValue = counterValue + 1
    } else {
      newCounterValue = appData["maximumSetCounterValue"]
    }
    setCounterValue(newCounterValue)
    setResetButtonState(false)
  }

  const resetCounter = () => {                                                                        //сброс счетчика
    setCounterValue(appData["minimumSetCounterValue"])
    setResetButtonState(true)
    setIncrementButtonState(false)
  }

  const buttonAndDisplayState = (display: boolean, button: boolean) => {
    setDisplay(display)
    setResetButtonState(button)
  }

  return (
      <div className="App">
        <Container maxWidth={"xs"} fixed style={{padding: 0}}>
          <Paper elevation={7} style={{borderRadius: "20px"}}>
            {(display)
                ? <MainScreen
                    statusIncrementButton={incrementButtonState}
                    statusResetButton={resetButtonState}
                    counterValue={counterValue}
                    increase={increase}
                    resetCounter={resetCounter}
                    buttonAndDisplayState={buttonAndDisplayState}/>
                : <SettingsScreen
                    maxAllowedCounterValue={maxAllowedCounterValue}
                    buttonAndDisplayState={buttonAndDisplayState}
                    setNewStartCounterValue={setNewStartCounterValue}
                    getLocalStorage={getLocalStorage}
                    setToLocalStorage={setToLocalStorage}
                />
            }
          </Paper>
        </Container>
      </div>
  )
}

export default App
