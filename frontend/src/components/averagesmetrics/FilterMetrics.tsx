import { ChangeEvent, useRef, useState } from "react"
import { AveragesData } from "../../context/MetricsContext"
import { SearchFilter } from "../../interfaces/interfaces"

interface Props {
  handleSubmit: (search: AveragesData) => void
}


const FilterMetrics = ({handleSubmit}: Props) => {

  const [timeFilter, setTimeFilter] = useState(SearchFilter.Day)

  const onTimeFilter = ({target}: ChangeEvent<HTMLInputElement>) => {
    if (
      target.value === SearchFilter.Day ||
      target.value === SearchFilter.Hour ||
      target.value === SearchFilter.Minute
    ) { setTimeFilter(target.value) }
  }

  const timestamp = useRef<HTMLInputElement>(null)

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (timestamp.current !== null) {
      const data: AveragesData = {
        timeFilter,
        timestamp: new Date(timestamp.current.value).getTime(),
      }
      handleSubmit(data)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <p>Time filter:</p>
      
      <label htmlFor="day">Day</label>
      <input type="radio" id="day" name="time_filter" value={SearchFilter.Day} onChange={onTimeFilter} required/>
      
      <label htmlFor="hour">Hour</label>
      <input type="radio" id="hour" name="time_filter" value={SearchFilter.Hour} onChange={onTimeFilter} required/>

      <label htmlFor="minute">Minute</label>
      <input type="radio" id="minute" name="time_filter" value={SearchFilter.Minute} onChange={onTimeFilter} required/>

      <br />

      <label htmlFor="time_init">Time</label>
      <input ref={timestamp} type="datetime-local" id="time_init" name="time_init" required/>

      <br />

      <input type="submit" value='Get Metrics'/>
    </form>
  )
}

export default FilterMetrics