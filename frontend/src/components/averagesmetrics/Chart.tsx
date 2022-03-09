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

  return (
    <XYPlot height={300} width={300} xDomain={[0, timestamps.length]}>
      { !!items && <DiscreteColorLegend items={info} orientation='horizontal'/> }
      { !!items && items }
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title='timestamps' />
      <YAxis title='averages' />
    </XYPlot>
  )
}

export default Chart