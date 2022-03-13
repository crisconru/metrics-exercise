import { useState } from "react";
import { AveragesFetched, AveragesNested, SearchFilter, AverageData, AveragesState } from "../interfaces/interfaces";


const getStep = (search: SearchFilter) => {
    // 1 hour step in miliseconds
    if (search === SearchFilter.Day) { return 24 * 60 * 60 * 1000 }
    // 1 minute step in miliseconds
    if (search === SearchFilter.Hour) { return 60 * 60 * 1000 }
    // 1 second step in miliseconds
    if (search === SearchFilter.Minute) { return 60 * 1000 }
    // Undefined step
    return 0
}

const getTimestamps = (start: number, end: number, search: SearchFilter) => {
    const step = getStep(search)
    let timestamps = []
    for (let i = start; i < end; i = i + step) {
        timestamps.push(i)
    }
    return timestamps
}


const getData = (averages: AveragesNested[]): AverageData[] => {
    let response = []
    for (let metric of averages) {
        const title = metric.name
        const data = []
        for (let average of metric.averages) {
            data.push({x: new Date(average[0]), y: average[1]})
        }
        response.push({ title, data})
    }
    return response
}

export const useAverages = (url: string) => {
    const [averages, setData] = useState<AveragesState>({} as AveragesState)
    const getAverages = (start: number, end: number, search: SearchFilter) => {
        const loadAverages = async () => {
            // Code
            const averageUrl = `${url}/?start=${start}&end=${end}&search=${search}`
            const response = await fetch(averageUrl)
            const json: AveragesFetched = await response.json()
            console.log(json)
            // Timestamps
            const timeStamps = getTimestamps(json.start, json.end, json.search)
            console.log('timestamps')
            console.log(timeStamps)
            
            const data: AverageData[] = getData(json.averages)
            console.log('data')
            console.log(data)
            const state: AveragesState = {
                start: json.start,
                end: json.end,
                search: json.search,
                averages: data,
                timestamps: timeStamps
            }
            setData(state)
        }
        loadAverages()
    }

    return { averages, getAverages }
}
