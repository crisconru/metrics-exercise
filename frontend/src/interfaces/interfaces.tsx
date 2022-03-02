export interface Metric {
    name: string
    value: number
    timestamp: number
}

export interface Average {
    name: string
    value: number
    timestamp: number
}

export interface MetricState {
    metrics?: string[]
    selectedMetric?: string
    averages?: Average[]
    minTimestamp?: number
    maxTimeStamp?: number
}