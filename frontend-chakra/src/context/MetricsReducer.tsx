import { MetricState } from '../interfaces/interfaces';

export type MetricsAction = 
    | { type: 'selectMetric', payload: string }
    | { type: 'setMetrics', payload: string[] };


export const MetricsReducer = ( state: MetricState, action: MetricsAction ): MetricState => {

    switch ( action.type ) {
        case 'selectMetric':
            return {
                ...state,
                selectedMetric: action.payload
            }

        case 'setMetrics': 
            return {
                ...state,
                metrics: action.payload
            }

            
        default:
            return state;
    }

}