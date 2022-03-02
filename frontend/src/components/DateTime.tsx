import { ChangeEvent } from "react"

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const DateTime = ({ onChange }: Props) => {
  return (
    <input type={'datetime-local'} onChange={onChange}/>
  )
}

export default DateTime