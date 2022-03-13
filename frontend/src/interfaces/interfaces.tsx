export interface Metric {
    name: string
    value: number
    timestamp: number
}

export interface MetricsState {
    metrics: string[],
    total: number,
    minTimestamp: number,
    maxTimestamp: number
}

export interface Average {
    name: string
    value: number
    timestamp: number
}

export interface DataAxis {
    x: Date,
    y: number
}

export interface AverageData {
    title: string,
    data: DataAxis[]
}

export enum SearchFilter {
    Day = 'day',
    Hour = 'hour',
    Minute = 'minute'
}

export interface AveragesState {
    start: number,
    end: number,
    search: SearchFilter,
    averages: AverageData[],
    timestamps: number[]
}

export interface AveragesNested {
    name: string,
    averages: [number, number][]
}

export interface AveragesFetched {
    start: number,
    end: number,
    search: SearchFilter
    averages: AveragesNested[]
}
