import { useState } from "react"
import { isContext } from "vm"
import { Metric } from "../interfaces/interfaces"
import { AveragesData, MetricsContext } from "./MetricsContext"

interface MetricFetched {
  name: string
}

interface MetricsFetched {
  metrics: MetricFetched[]
}


interface Props {
    children: JSX.Element | JSX.Element[]
}


// const BACKEND = 'http://localhost:8880'
const BACKEND = 'http://backend:80'
const URL_METRICS = `${BACKEND}/metrics`
const URL_AVERAGES = `${BACKEND}/metrics/average`

export const MetricsProvider = ({ children }: Props ) => {

  const [metrics, setMetrics] = useState<string[]>([])

  const [selectedMetric, setSelectedMetric] = useState<string>('')

  const getMetrics = () => {
    const loadMetrics = async () => {
      const res = await fetch(URL_METRICS)
      const ms: MetricsFetched = await res.json()
      const mss =  ms.metrics.map(m => m.name)
      setMetrics(mss)
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
      console.log('options');
      console.log(fetchOptions);
      
      
      const respose = await fetch(URL_METRICS, fetchOptions)
      const res = await respose.json()
      console.log(res);
      if (res.hasOwnProperty('metrics')) {
        const newMetrics: string[] = res.metrics.map((m: MetricFetched) => m.name)
        setMetrics(newMetrics)
      }
    }
    console.log('push metric')
    pushMetrics()
  }

  const getAverages = (search: AveragesData) => {
    console.log('get averages')
    const loadAverages = async () => {
      console.log('pedir metricas');
      
      const timestamp = 1643879472130
      const s = 'day'
      const url = `${URL_AVERAGES}/${timestamp}?search=${s}`
      const response = await fetch(url)
      const ms  = await response.json()
      console.log(ms)
      // const mss =  ms.metrics.map(m => m.name)
      // setMetrics(mss)
    }
    loadAverages()
  }

  return (
    <MetricsContext.Provider value={
      { 
        selectedMetric, setSelectedMetric,
        metrics,
        getMetrics, postMetrics,
        getAverages
      }
    }>
      { children }
    </MetricsContext.Provider>
  )
}
