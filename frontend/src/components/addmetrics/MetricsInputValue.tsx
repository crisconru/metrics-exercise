import { 
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react'

interface Props {
  value: string
  onChange: (value: string) => void
  isError: boolean
}

export const MetricsInputValue = ({value, onChange, isError}: Props ) => {
  return (
    <FormControl isRequired isInvalid={isError}>
      <FormLabel htmlFor="value">Value</FormLabel>
      <NumberInput id="value" allowMouseWheel step={0.2} precision={2} value={value} onChange={onChange} >
        <NumberInputField/>
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {isError && <FormErrorMessage>Set a valid value</FormErrorMessage>}
    </FormControl>
  )
}

export default MetricsInputValue