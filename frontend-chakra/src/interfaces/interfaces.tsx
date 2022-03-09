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

export enum SearchFilter {
    Day = 'day',
    Hour = 'hour',
    Minute = 'minute'
}

export interface AveragesNested {
    name: string,
    averages: [number, number][]
}

export interface AveragesFetched {
    timestamp: string
    search: SearchFilter
    averages: AveragesNested[]
}

export interface AverageDataAxis {
    x: Date,
    y: number
}

export interface AverageData {
    title: string,
    data: AverageDataAxis[]
}