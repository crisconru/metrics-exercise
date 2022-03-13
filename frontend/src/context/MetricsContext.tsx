import { createContext } from "react";
import { AveragesState, Metric, MetricsState, SearchFilter } from "../interfaces/interfaces";


export interface MetricsStateContex {
    metrics: MetricsState,
    getMetrics: () => void
    postMetrics: (mtcs: Metric[]) => void
    averages: AveragesState
    getAverages: (start: number, end: number, search: SearchFilter) => void
}

export const MetricsContext = createContext<MetricsStateContex>({} as MetricsStateContex)