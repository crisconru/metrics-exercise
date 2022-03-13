import { Center } from "@chakra-ui/react"
import { forwardRef } from "react"

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DateTimeButton = forwardRef<HTMLButtonElement>(({ value, onClick }: any, ref) => (
  <button onClick={onClick} ref={ref}>
    {value}
  </button>
))

interface Props {
  date: Date | null
  onChange: (date: Date) => void
}

const DateTime = ({ date, onChange }: Props) => {
  return (
    <Center>
      <DatePicker
        dateFormat='yyyy/MM/dd'
        showTimeSelect
        selected={date}
        onChange={onChange}
        customInput={<DateTimeButton />}
      />
    </Center>
  )
}

export default DateTime
