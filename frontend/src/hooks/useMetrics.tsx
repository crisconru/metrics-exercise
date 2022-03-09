import { useState } from "react"
import { Metric } from "../interfaces/interfaces"


interface MetricFetched {
    name: string
}

interface MetricsFetched {
    metrics: MetricFetched[]
}

export const useMetrics = (url: string) => {

    const [metrics, setMetrics] = useState<string[]>([])

    const getMetrics = () => {
        const loadMetrics = async () => {
            const res = await fetch(url)
            const json: MetricsFetched = await res.json()
            const ms = json.metrics.map(m => m.name)
            setMetrics(ms)
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
            const respose = await fetch(url, fetchOptions)
            const res = await respose.json()
            if (res.hasOwnProperty('metrics')) {
              const newMetrics: string[] = res.metrics.map((m: MetricFetched) => m.name)
              setMetrics(newMetrics)
            }
          }
          pushMetrics()
    }

    return { metrics, getMetrics , postMetrics }
}