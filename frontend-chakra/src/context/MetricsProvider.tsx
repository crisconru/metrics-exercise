import { useState } from "react"
import { MetricsContext } from "./MetricsContext"
import { useMetrics } from  "../hooks/useMetrics"
import { useAverages } from "../hooks/useAverages"

const BACKEND = process.env.BACKEND_URL || 'http://localhost:8880'
const URL_METRICS = `${BACKEND}/metrics`
const URL_AVERAGES = `${BACKEND}/metrics/average`

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MetricsProvider = ({ children }: Props ) => {
  
  const [selectedMetric, setSelectedMetric] = useState<string>('')
  
  const { metrics, getMetrics, postMetrics } = useMetrics(URL_METRICS)

  const { timestamps, info, getAverages } = useAverages(URL_AVERAGES)

  return (
    <MetricsContext.Provider value={
      { 
        selectedMetric, setSelectedMetric,
        metrics, getMetrics, postMetrics,
        timestamps, info, getAverages
      }
    }>
      { children }
    </MetricsContext.Provider>
  )
}
