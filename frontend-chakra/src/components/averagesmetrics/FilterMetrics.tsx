import { Flex, HStack, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { AveragesData } from "../../context/MetricsContext"
import { SearchFilter } from "../../interfaces/interfaces"


interface Props {
  handleSubmit: (search: AveragesData) => void
}


const FilterMetrics = ({handleSubmit}: Props) => {

  const [timeFilter, setTimeFilter] = useState(SearchFilter.Day)
  const [timeStamp, setTimeStamp] = useState(-1)

  // const onTimeFilter = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (
  //     e.target.value === SearchFilter.Day ||
  //     e.target.value === SearchFilter.Hour ||
  //     e.target.value === SearchFilter.Minute
  //   ) { setTimeFilter(e.target.value) }
  // } 
  
  const onTimeFilter = (filter: SearchFilter) => {
    setTimeFilter(filter)
  }

  const onDate = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const t = new Date(e.target.value).getTime()
    setTimeStamp(t)
    
  }
  const timestamp = useRef<HTMLInputElement>(null)

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (timestamp.current !== null) {
      const data: AveragesData = {
        timeFilter,
        timestamp: new Date(timestamp.current.value).getTime(),
      }
      handleSubmit(data)
    }
  }

  useEffect(() => {
    console.log('filter');
    console.log(timeFilter);
    console.log('timestamp');
    console.log(timeStamp);
    if (timeStamp > -1) {
      const data: AveragesData = {
        timeFilter,
        timestamp: timeStamp,
      }
      handleSubmit(data)
    }
  }, [timeFilter, timeStamp])
  

  return (
    <Flex direction='row' justify='center'>
        <RadioGroup defaultValue={SearchFilter.Day} onChange={onTimeFilter}>
          <Stack spacing='20px' direction='row'>
            <Radio colorScheme='green' value={SearchFilter.Day}>Day</Radio>
            <Radio colorScheme='green' value={SearchFilter.Hour}>Hour</Radio>
            <Radio colorScheme='green' value={SearchFilter.Minute}>Minute</Radio>
          </Stack>
        </RadioGroup>

        <input type="datetime-local" id="time_init" name="time_init" required onChange={onDate} />

    </Flex>
  )
}

export default FilterMetrics