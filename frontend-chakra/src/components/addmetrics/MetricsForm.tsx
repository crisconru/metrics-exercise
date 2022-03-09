import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import { MetricsContext } from "../../context/MetricsContext";
import { Metric } from "../../interfaces/interfaces";
import MetricsInputDatetime from "./MetricsInputDatetime";
import MetricsInputName from "./MetricsInputName";
import MetricsInputValue from "./MetricsInputValue";
import MetricsSelectMetric from "./MetricsSelectMetric";
import MetricsSubmit from "./MetricsSubmit";

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

interface State {
  name: string
  value: string
  timestamp: number
}

const INITIAL_STATE: State = {
  name: '',
  value: '',
  timestamp: -1
}

export const MetricsForm = () => {

  const context = useContext(MetricsContext)

  useEffect(() => {
    context.getMetrics()
  }, [])

  
  const [state, setState] = useState<State>(INITIAL_STATE)
  const [statePrev, setStatePrev] = useState<State>(INITIAL_STATE)
  useEffect(() => {
    setState(INITIAL_STATE)
  }, [context.metrics])
  const isInMetrics = (v: string) => context.metrics.includes(v)
  // Select
  const handleChange = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const v = target.value
    const metricSelected = isInMetrics(v) ? v : ''
    context.setSelectedMetric(metricSelected)
  }
  // Name
  const isValidName = () => state.name !== ''
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setState({...state, name: e.target.value})
  useEffect(() => {
    setState({...state, name: context.selectedMetric})
  }, [context.selectedMetric])
  // Value
  const isValidValue = () => (state.value !== '') && (!isNaN(parseFloat(state.value)))
  const onChangeValue = (v: string) => setState({...state, value: v})
  // Timestamp
  const [datestring, setDatestring] = useState('')
  const isValidTimestamp = () => state.timestamp >= 0
  const onChangeTimestamp = (e: ChangeEvent<HTMLInputElement>) => setDatestring(e.target.value)
  useEffect(() => {
    if (datestring !== '') setState({...state, timestamp: new Date(datestring).getTime()})
  }, [datestring])
  // Form
  const onMetric = (m: Metric) => { context.postMetrics([m]) }

  const onDate = (date: Date) => console.log(date)

  const handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    console.log('formulario')
    console.log('name')
    console.log(state.name)
    console.log('value')
    console.log(state.value)
    console.log('timestamp')
    console.log(state.timestamp)
    if (isValidName() && isValidValue() && isValidTimestamp()) {
      console.log('formulario valido')
      const m: Metric = {
          name: state.name,
          value: parseFloat(state.value),
          timestamp: state.timestamp
      }
      onMetric(m)
    } else {
      console.log('formulario invalido')
    }
  }

  return (
    <>
      <MetricsSelectMetric metrics={context.metrics} onChange={handleChange} />
      <MetricsInputName isError={!isValidName()} metric={state.name} onChange={onChangeName} readOnly={isInMetrics(state.name)}/>
      <MetricsInputValue isError={!isValidValue()} value={state.value} onChange={onChangeValue} />
      <MetricsInputDatetime isError={!isValidTimestamp()} value={datestring} onChange={onChangeTimestamp} />
      <MetricsSubmit onSubmit={handleSubmit} />
      <DatePicker selected={new Date()} onChange={onDate} showTimeSelect dateFormat="Pp"/>
    </>
  )
}
