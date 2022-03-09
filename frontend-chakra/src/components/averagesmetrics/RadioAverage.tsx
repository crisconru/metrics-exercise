import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react"

// 1. Create a component that consumes the `useRadio` hook
const RadioCard = (props: any) => {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={3}
        >
          {props.children}
        </Box>
      </Box>
    )
}
 

interface Props {
    options: string[],
    onChange: (e: any) => void
}
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export const Example = () => {
  const options = ['day', 'hour', 'minute']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'timefilter',
    defaultValue: 'day',
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
  
//   render(<Example />)