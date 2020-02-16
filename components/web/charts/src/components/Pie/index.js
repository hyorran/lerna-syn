import React from 'react'
import { Chart, PieSeries, } from '@devexpress/dx-react-chart-material-ui'

const data = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
  { country: 'Brazil', area: 6 },
  { country: 'Australia', area: 5 },
  { country: 'India', area: 2 },
  { country: 'Others', area: 55 },
]

class Pie extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data
    }

  }

  render() {
    const { data: chartData } = this.state

    return (
      <div>
        <Chart
          data={ chartData }
        >
          <PieSeries
            valueField="area"
            argumentField="country"
          />
        </Chart>
      </div>
    )
  }
}

Pie.propTypes = {}

export default Pie
