import { ChangeEvent } from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'

interface Props {
  metric: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  readOnly: boolean
  isError: boolean
}

const MetricsInputName =  ({metric, onChange, readOnly, isError}: Props) => {  
  return (
    <FormControl isRequired isInvalid={isError}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <Input id="name" placeholder="Name" value={metric} onChange={onChange} readOnly={readOnly}/>
      {isError && <FormErrorMessage>Set a valid name</FormErrorMessage>}
    </FormControl>
  )
}

export default MetricsInputName