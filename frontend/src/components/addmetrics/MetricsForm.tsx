import { SyntheticEvent, useRef } from "react";
import { Metric } from "../../interfaces/interfaces";

interface Props {
    selectedName: string,
    onMetric: (m: Metric) => void
}

export const MetricsForm = ({selectedName, onMetric}: Props) => {

  const name = useRef<HTMLInputElement>(null)
  const value = useRef<HTMLInputElement>(null)
  const timestamp = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const m = {
        name: (name.current) ? name.current.value : '',
        value: (value.current) ? parseFloat(value.current.value) : 0.0,
        timestamp: (timestamp.current)
          ? new Date(timestamp.current.value).getTime()
          : 0
    }
    onMetric(m)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Name">Name</label>
      {selectedName
        ? <input ref={name} type="text" name="Name" id="Name" value={selectedName}/>
        : <input ref={name} type="text" name="Name" id="Name" required />
      }
      <br />
      <label htmlFor="Value">Value</label>
      <input ref={value} type="number" name="Value" id="Value" step={0.01} required />
      <br />
      <label htmlFor="Timestamp">Timestamp</label>
      <input ref={timestamp} type="datetime-local" name="Timestamp" id="Timestamp"  step="1" required />
      <br />
      <input type="submit" value="ADD" />
    </form>
  )
}
