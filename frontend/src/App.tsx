import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
} from "@chakra-ui/react"
import { MetricsProvider } from "./context/MetricsProvider"
import AverageMetrics from "./components/averagesmetrics/AverageMetrics"
import AddMetrics from "./components/addmetrics/AddMetrics"
import mytheme from './Theme'

const App = () => {
  return (
    <ChakraProvider theme={mytheme}>
    {/* <ChakraProvider theme={theme}> */}
      <MetricsProvider>
        <Box bg={'brand.500'} color={'white'} px={4}>
          <Text fontSize='5xl'>Metrics Exercise</Text>
        </Box>
        <AverageMetrics />
        <AddMetrics />
      </MetricsProvider>
    </ChakraProvider>
  )
}

export default App
