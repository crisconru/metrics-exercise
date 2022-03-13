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
    
  const { metrics, getMetrics, postMetrics } = useMetrics(URL_METRICS)

  const { averages, getAverages } = useAverages(URL_AVERAGES)

  return (
    <MetricsContext.Provider value={
      { 
        metrics, getMetrics, postMetrics,
        averages, getAverages
      }
    }>
      { children }
    </MetricsContext.Provider>
  )
}
