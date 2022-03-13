import { ChangeEvent } from 'react'
import { FormControl, FormLabel, Select } from '@chakra-ui/react'

const ANOTHER = 'another'

interface Props {
  metrics: string[],
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const MetricsSelectMetric = ( {metrics, onChange}: Props ) => {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="selected">Select a metric</FormLabel>
      <Select id="selected" placeholder='Select option' onChange={onChange}>
        <option key={ANOTHER} value=''>Add a new one</option>
        {!!metrics && metrics.map( metric => <option key={metric}>{metric}</option> )}
      </Select>
    </FormControl>
  )
}

export default MetricsSelectMetric