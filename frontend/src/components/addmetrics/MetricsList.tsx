import { ChangeEvent } from 'react'

interface Props {
    metrics: string[],
    handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const ANOTHER = 'another'

const MetricsList = ( {metrics, handleChange}: Props ) => {

  console.log('render list')
  
  return (
    <select onChange = {handleChange}>
      {metrics.map( metric => <option key={metric}>{metric}</option> )}
      <option key={ANOTHER}>Añadir nueva</option>
    </select> 
  )
}

export default MetricsList