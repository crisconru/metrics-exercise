import { useState } from "react";
import { AveragesData } from "../context/MetricsContext";
import { AveragesFetched, AveragesNested, SearchFilter, AverageData } from "../interfaces/interfaces";


interface StateAverages {
    timestamps: number[],
    info: AverageData[]
}

const getStep = (search: SearchFilter) => {
    // 1 hour step in miliseconds
    if (search === SearchFilter.Day) { return 60 * 60 * 1000 }
    // 1 minute step in miliseconds
    if (search === SearchFilter.Hour) { return 60 * 1000 }
    // 1 second step in miliseconds
    if (search === SearchFilter.Minute) { return 1000 }
    // Undefined step
    return 0
}

const getLimits = (timestamp: number, search: SearchFilter) => {
    let start: number = 0
    let end  : number = 0
    const step = getStep(search)
    // Get date from timestamp
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    if (search === SearchFilter.Day) {
        start = new Date(year, month, day).getTime()
        end = start + (24 * step)
    } else {
        const hour = date.getHours()
        if (search === SearchFilter.Hour) {
            start = new Date(year, month, day, hour).getTime()
            end = start + (60 * step)
        } else if (search === SearchFilter.Minute) {
            const minute = date.getMinutes()
            start = new Date(year, month, day, hour, minute).getTime()
            end = start + (60 * step)
        }
    }
    return { start, end, step}

}

const getTimestamps = (timestamp: number, search: SearchFilter) => {
    const {start, end, step} = getLimits(timestamp, search)
    let timestamps = []
    for (let i = start; i < end; i = i + step) {
        timestamps.push(i)
    }
    return timestamps
}

const getNormalizedTimestamp = (x: number, timestamps: number[]) => {
    return timestamps.indexOf(x)
}

const getData = (averages: AveragesNested[], timestamps: number[]) => {
    let response = []
    for (let metric of averages) {
        const title = metric.name
        const data = []
        for (let average of metric.averages) {
            data.push({x: new Date(average[0]), y: average[1]})
            // data.push({x: getNormalizedTimestamp(average[0], timestamps), y: average[1]})
        }
        response.push({ title, data})
    }
    return response
}

export const useAverages = (url: string) => {
    const [{timestamps, info}, setData] = useState<StateAverages>({} as StateAverages)
    const getAverages = (search: AveragesData) => {
        const loadAverages = async () => {
            const timestamp = search.timestamp
            const s = search.timeFilter
            // Code
            const averageUrl = `${url}/${timestamp}?search=${s}`
            const response = await fetch(averageUrl)
            const json: AveragesFetched = await response.json()
            console.log(json)
            // Timestamps
            const t_stamps = getTimestamps(timestamp, s)
            console.log('timestamps')
            console.log(t_stamps)
            
            const data = getData(json.averages, t_stamps)
            console.log('data')
            console.log(data)

            setData({ timestamps: t_stamps, info: data})
        }
        loadAverages()
    }

    return { timestamps, info, getAverages }
}
