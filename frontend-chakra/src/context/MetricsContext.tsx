import { createContext } from "react";
import { AverageData, AveragesFetched, Metric, SearchFilter } from "../interfaces/interfaces";

export interface AveragesData {
    timeFilter: SearchFilter,
    timestamp: number,
}

export interface MetricsStateContex {
    selectedMetric: string
    setSelectedMetric: (metric: string) => void
    metrics: string[],
    getMetrics: () => void
    postMetrics: (mtcs: Metric[]) => void
    // averagesData: AverageData[]
    timestamps: number[]
    info: AverageData[]
    getAverages: (search: AveragesData) => void
}

export const MetricsContext = createContext<MetricsStateContex>({} as MetricsStateContex)