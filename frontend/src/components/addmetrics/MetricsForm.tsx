import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react";
import { MetricsContext } from "../../context/MetricsContext";
import { Metric } from "../../interfaces/interfaces";
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
  timestamp: new Date().getTime()
}

export const MetricsForm = () => {

  const context = useContext(MetricsContext)

  useEffect(() => {
    context.getMetrics()
  }, [])

  const [state, setState] = useState<State>(INITIAL_STATE)

  useEffect(() => {
    setState(INITIAL_STATE)
  }, [context.metrics])

  const isInMetrics = (v: string) => {
    if (!!context.metrics.metrics) return context.metrics.metrics.includes(v)
    return false
  }
  // Select
  const onChangeMetric = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const v = target.value
    const metricSelected = isInMetrics(v) ? v : ''
    setState({...state, name: metricSelected})
  }
  // Name
  const isValidName = () => state.name !== ''
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setState({...state, name: e.target.value})
  // Value
  const isValidValue = () => (state.value !== '') && (!isNaN(parseFloat(state.value)))
  const onChangeValue = (v: string) => setState({...state, value: v})
  // Timestamp
  const [datestring, setDatestring] = useState('')
  const isValidTimestamp = () => (state.timestamp >= 0)
  const onChangeTimestamp = (date: Date) => setDatestring(date.toString())
  useEffect(() => {
    if (datestring !== '') setState({...state, timestamp: new Date(datestring).getTime()})
  }, [datestring])
  // Form
  const onMetric = (m: Metric) => { context.postMetrics([m]) }

  const handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    if (isValidName() && isValidValue() && isValidTimestamp()) {
      console.log('formulario válido')
      const m: Metric = {
          name: state.name,
          value: parseFloat(state.value),
          timestamp: state.timestamp
      }
      onMetric(m)
    }
  }

  return (
    <>
      <MetricsSelectMetric metrics={context.metrics.metrics} onChange={onChangeMetric} />
      <MetricsInputName isError={!isValidName()} metric={state.name} onChange={onChangeName} readOnly={isInMetrics(state.name)}/>
      <MetricsInputValue isError={!isValidValue()} value={state.value} onChange={onChangeValue} />
      <DatePicker
        selected={new Date(state.timestamp)}
        onChange={onChangeTimestamp}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="p"
        timeIntervals={1}/>
      <MetricsSubmit onSubmit={handleSubmit} />
    </>
  )
}
