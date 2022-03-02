import FilterMetrics from "./FilterMetrics"
import Chart from "./Chart"
import { useContext } from "react"
import { AveragesData, MetricsContext } from "../../context/MetricsContext"

export const AverageMetrics = () => {
  const {getAverages} = useContext(MetricsContext)

  const handleSubmit = (search: AveragesData) => {
    console.log('get metricas ')
    console.log(search)
    console.log('obetener metricas');
    
    getAverages(search)
  }

  return (
    <>
      <h2>Averages</h2>
      <FilterMetrics handleSubmit={handleSubmit}/>
      <Chart />
    </>
  )
}

export default AverageMetrics