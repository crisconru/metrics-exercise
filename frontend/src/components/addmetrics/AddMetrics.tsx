import { Center, Text, VStack } from "@chakra-ui/react"
import { MetricsForm } from "./MetricsForm"

const AddMetrics = () => {
  return (
    <>
      <Center bg={'brand.500'} color={'letters'}>
        <Text fontSize='4xl'>Add a metric</Text>
      </Center>
      <Center>
        <VStack>
          <MetricsForm />
        </VStack>
      </Center>
    </>
  )
}

export default AddMetrics