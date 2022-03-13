import { useContext, useEffect, useState } from "react"
import { MetricsContext } from "../../context/MetricsContext"
import { Center, Text } from "@chakra-ui/react"
import Chart from "./Chart"
import FilterMetrics from "./FilterMetrics"
import { SearchFilter } from "../../interfaces/interfaces"


interface State {
  start: Date,
  end: Date,
  search: SearchFilter
}

const isEmpty = (obj: Object) => {
  for (const property in obj) {
    return false
  }
  return true
}

export const AverageMetrics = () => {
  const { averages, getAverages, metrics } = useContext(MetricsContext)
  const [state, setState] = useState<State>({} as State)

  const [loading, setLoading] = useState(0)

  const isLoading = (isEmpty(averages) || loading === 1)

  useEffect(() => {
    if (!isEmpty(metrics)) {
      setState({
        start: new Date(metrics.minTimestamp),
        end: new Date(metrics.maxTimestamp),
        search: SearchFilter.Day
      })
    }
  }, [metrics])

  useEffect(()=> {
    if (!isEmpty(state)) {
      setLoading(1)
    }
  }, [state])
  
  useEffect(() => {
    if (loading === 1) {
      const start = state.start.getTime()
      const end = state.end.getTime()
      getAverages(start, end, state.search)
    }
  }, [loading])

  useEffect(() => {
    if(loading === 1) setLoading(2)
  }, [averages])

  const onChangeFilter = (start: Date, end: Date, search: SearchFilter) => {
    setState({start, end, search})
  }

  return (
    <>
      {!isEmpty(metrics) && 
        <Center bg={'brand.500'} color='white'>
          <Text fontSize='4xl'>Averages</Text>
        </Center>
      }
      {loading === 1 &&
        <Center>
          <Text fontSize='2xl'>Cargando . . .</Text>
        </Center>
      }
      {!isLoading && <Chart info={averages.averages} timestamps={averages.timestamps}/> }
      {!isEmpty(metrics) && 
        <FilterMetrics
          start={state.start}
          end={state.end}
          search={state.search}
          onChange={onChangeFilter}
        />
      }
    </>
  )
}

export default AverageMetrics