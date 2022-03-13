import { Flex } from "@chakra-ui/react"
import { SearchFilter } from "../../interfaces/interfaces"
import DatesAverage from "./DatesAverage"
import RadioAverage from "./RadioAverage"


interface Props {
  start: Date,
  end: Date,
  search: SearchFilter
  onChange: (start: Date, end: Date, search: SearchFilter) => void
}


const FilterMetrics = (props: Props) => {

  const onSearch = (search: SearchFilter) => {
    props.onChange(props.start, props.end, search)
  }

  const onDates = (start: Date, end: Date) => {
    props.onChange(start, end, props.search)
  }

  return (
    <Flex flexDirection={{ base: 'column', sm: 'row' }} justifyContent='center'>
      <RadioAverage defaultValue={SearchFilter.Day} onChange={onSearch} />
      <DatesAverage start={props.start} end={props.end} onChange={onDates}/>
    </Flex>
  )
}

export default FilterMetrics