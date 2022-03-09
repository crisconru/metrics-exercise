import { SyntheticEvent } from 'react'
import { Button, FormControl } from '@chakra-ui/react'

interface Props {
  onSubmit: (e: SyntheticEvent<HTMLButtonElement>) => void
}

export const MetricsSubmit = ({onSubmit}: Props) => {
  return (
    <FormControl>
      <Button type="submit" colorScheme='green' w='100%' onClick={onSubmit}>ADD</Button>
    </FormControl>
  )
}

export default MetricsSubmit