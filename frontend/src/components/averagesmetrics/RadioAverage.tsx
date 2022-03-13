import { Center, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { SearchFilter } from "../../interfaces/interfaces"


interface Props {
  defaultValue: SearchFilter
  onChange: (e: any) => void
}
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export const RadioAverage = ({defaultValue, onChange}: Props) => {

  return (
    <Center>
      <RadioGroup defaultValue={defaultValue} onChange={onChange}>
        <Stack spacing={2} direction='row'>
          {/* <Stack spacing={2} direction={{ base: 'column', sm: 'row' }}> */}
          <Radio colorScheme='brand' value={SearchFilter.Day}>Day</Radio>
          <Radio colorScheme='brand' value={SearchFilter.Hour}>Hour</Radio>
          <Radio colorScheme='brand' value={SearchFilter.Minute}>Minute</Radio>
        </Stack>
      </RadioGroup>
    </Center>
  )
}

export default RadioAverage