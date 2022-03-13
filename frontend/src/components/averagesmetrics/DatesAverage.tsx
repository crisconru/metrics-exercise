import React, { useEffect, useState } from 'react'
import { Center, Stack } from '@chakra-ui/react'
import DatePicker from "react-datepicker"


interface Props {
  start: Date,
  end: Date,
  onChange: (start: Date, end: Date) => void
}

export const DatesAverage = (props: Props) => {

  const onChangeStart = (date: Date) => {
    props.onChange(date, props.end)
  }

  const onChangeEnd = (date: Date) => {
    props.onChange(props.start, date)
  }

  return (
    <Center marginLeft={{ base: 0, sm: 2 }} marginTop={{ base: 2, sm: 0 }}>
      <Stack spacing={2} direction='column'>
          <DatePicker
            selected={props.start}
            onChange={onChangeStart}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="p"
            timeIntervals={1}
          />
 
          <DatePicker
            selected={props.end}
            onChange={onChangeEnd}
            showTimeSelect
            dateFormat="Pp"
            timeFormat="p"
            timeIntervals={1}
          />
      </Stack>
    </Center>
  )
}

export default DatesAverage