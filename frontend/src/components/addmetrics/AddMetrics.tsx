import { ChangeEvent, useContext, useEffect } from "react"
import { MetricsContext } from "../../context/MetricsContext"
import { Metric } from "../../interfaces/interfaces"
import { MetricsForm } from "./MetricsForm"
import MetricsList from "./MetricsList"

const AddMetrics = () => {

  const context = useContext(MetricsContext)

  useEffect(() => {
    context.getMetrics()
  }, [])

  const selectMetric = ({target}: ChangeEvent<HTMLSelectElement>) => {
    const value = target.value
    const metricSelected = (context.metrics.includes(value)) ? value : ''
    context.setSelectedMetric(metricSelected)
  }

  const onMetric = (m: Metric) => { context.postMetrics([m]) }

  return (
    <>
      <h2>Add a metric</h2>
      <MetricsList metrics={context.metrics} handleChange={selectMetric}/>
      <MetricsForm selectedName={context.selectedMetric} onMetric={onMetric}/>
    </>
  )
}

export default AddMetrics