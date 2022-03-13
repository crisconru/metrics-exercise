import { useState } from "react"
import { Metric, MetricsState } from "../interfaces/interfaces"

interface MetricsFetched {
  message: string,
  metrics: string[]
  firstTimestamp: number,
  lastTimestamp: number,
  total: number
}

export const useMetrics = (url: string) => {

  const [metrics, setMetrics] = useState<MetricsState>({} as MetricsState)

  const getMetrics = () => {
    const loadMetrics = async () => {
      const response = await fetch(url)
      const res: MetricsFetched = await response.json()
      console.log()
      
      setMetrics({
        metrics: res.metrics,
        minTimestamp: res.firstTimestamp,
        maxTimestamp: res.lastTimestamp,
        total: res.total
      })
    }
    loadMetrics()
  }

  const postMetrics = (mtcs: Metric[]) => {
    const pushMetrics = async () => {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mtcs)
      }
      const response = await fetch(url, fetchOptions)
      const res: MetricsFetched = await response.json()
      setMetrics({
        metrics: res.metrics,
        minTimestamp: res.firstTimestamp,
        maxTimestamp: res.lastTimestamp,
        total: res.total
      })
    }
    pushMetrics()
  }

  return { metrics, getMetrics, postMetrics }
}