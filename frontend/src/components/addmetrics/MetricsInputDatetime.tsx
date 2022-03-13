import { ChangeEvent } from 'react'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'

interface Props {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isError: boolean
}

const MetricsInputDatetime = ({value, onChange, isError}: Props) => {  

  return (
    <FormControl isRequired isInvalid={isError}>
      <FormLabel htmlFor="timestamp">Timestamp</FormLabel>
      <input type="datetime-local" name="timestamp" id="timestamp" step="1" value={value} onChange={onChange} />
      {isError && <FormErrorMessage>Set a valid datetime</FormErrorMessage>}
    </FormControl>
  )
}

export default MetricsInputDatetime