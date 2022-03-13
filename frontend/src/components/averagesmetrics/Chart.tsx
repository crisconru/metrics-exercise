import { Center } from '@chakra-ui/react';
import {
  XYPlot, 
  VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
  LineMarkSeries, Crosshair, DiscreteColorLegend 
} from 'react-vis'
import '../../../node_modules/react-vis/dist/style.css'
import { AverageData } from '../../interfaces/interfaces';

interface Props {
  info: AverageData[]
  timestamps: number[]
}

const Chart = ({info, timestamps}: Props) => {
  console.log('info')
  
  console.log(info)
  
  const items = (!!info) ? info.map(d => <LineMarkSeries key={d.title} data={d.data} />) : null

  // const domain = [0, timestamps.length]
  const domain = [new Date(timestamps[0]), new Date(timestamps.slice(-1)[0])]

  return (
    <Center>
      {/* <XYPlot height={300} width={300} xDomain={[0, timestamps.length]}> */}
      <XYPlot height={300} width={300} xType='time' xDomain={domain}>
        { !!items && items }
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title='timestamps' />
        <YAxis title='averages' />
      </XYPlot>
      { !!items && <DiscreteColorLegend items={info} orientation='vertical'/> }
    </Center>
  )
}

export default Chart