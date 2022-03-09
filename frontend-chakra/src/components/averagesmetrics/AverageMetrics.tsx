import FilterMetrics from "./FilterMetrics"
import Chart from "./Chart"
import { useContext } from "react"
import { AveragesData, MetricsContext } from "../../context/MetricsContext"
import { Box, Center, Text } from "@chakra-ui/react"
// import { AverageData } from "../../interfaces/interfaces"

// const data1 = [
//   // {x: 0, y: 8},
//   { x: 1, y: 5 },
//   { x: 2, y: 4 },
//   { x: 3, y: 9 },
//   { x: 4, y: 1 },
//   { x: 5, y: -7 },
//   { x: 6, y: 6 },
//   { x: 7, y: 3 },
//   { x: 8, y: 2 },
//   { x: 9, y: 0 }
// ];
// const info1 : AverageData = {
//   title: '1',
//   data: data1
// }
// const data2 = [
//   { x: 0, y: 1 },
//   { x: 1, y: 2 },
//   // {x: 2, y: 3},
//   { x: 3, y: 4 },
//   { x: 4, y: 5 },
//   // {x: 5, y: 6},
//   // {x: 6, y: 7},
//   // {x: 7, y: 8},
//   { x: 8, y: 9 },
//   // {x: 9, y: 0}
// ];
// const info2: AverageData = {
//   title: '2',
//   data: data2
// }
// const DATA = [info1, info2]

export const AverageMetrics = () => {
  const {timestamps, info, getAverages} = useContext(MetricsContext)

  const handleSubmit = (search: AveragesData) => {    
    getAverages(search)
  }

  const validChart = () => {
    return !!info && info.length > 0 && timestamps.length > 0
  }
  return (
    <>
      <Center bg='forestgreen' color='white'>
        <Text fontSize='4xl'>Averages</Text>
      </Center>
      {validChart() && <Chart info={info} timestamps={timestamps}/> }
      <FilterMetrics handleSubmit={handleSubmit}/>
    </>
  )
}

export default AverageMetrics