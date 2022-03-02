import { createContext } from "react";
import { Metric } from "../interfaces/interfaces";

export interface AveragesData {
    timeFilter: string,
    timestamp: number,
}

export interface MetricsStateContex {
    selectedMetric: string
    setSelectedMetric: (metric: string) => void
    metrics: string[],
    getMetrics: () => void
    postMetrics: (mtcs: Metric[]) => void
    getAverages: (search: AveragesData) => void
}

export const MetricsContext = createContext<MetricsStateContex>({} as MetricsStateContex)