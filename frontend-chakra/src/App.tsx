import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { MetricsProvider } from "./context/MetricsProvider"
import AverageMetrics from "./components/averagesmetrics/AverageMetrics"
import AddMetrics from "./components/addmetrics/AddMetrics"


const BGCOLOR = 'forestgreen'
const COLOR = 'white'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <MetricsProvider>
        <Box bg={BGCOLOR} color={COLOR} px={4}>
          <Text fontSize='5xl'>Metrics Exercise</Text>
        </Box>
        <AverageMetrics />
        <AddMetrics />
      </MetricsProvider>
    </ChakraProvider>
  )
}

export default App



// export const App = () => (
//   <ChakraProvider theme={theme}>
//     <Box textAlign="center" fontSize="xl">
//       <Grid minH="100vh" p={3}>
//         <ColorModeSwitcher justifySelf="flex-end" />
//         <VStack spacing={8}>
//           <Logo h="40vmin" pointerEvents="none" />
//           <Text>
//             Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
//           </Text>
//           <Link
//             color="teal.500"
//             href="https://chakra-ui.com"
//             fontSize="2xl"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn Chakra
//           </Link>
//         </VStack>
//       </Grid>
//     </Box>
//   </ChakraProvider>
// )
