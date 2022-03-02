import { MetricsProvider } from "./context/MetricsProvider"
import AverageMetrics from "./components/averagesmetrics/AverageMetrics"
import AddMetrics from "./components/addmetrics/AddMetrics"

const App = () => {
  return (
    <MetricsProvider>
      <h1>Metrics Exercise</h1>
      <AverageMetrics />
      <AddMetrics />
    </MetricsProvider>
  )
}

export default App