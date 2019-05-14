import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
// import PieClass from './PieClass'
import PieHooks from './PieHooks'
// import PieSVG from './PieSVG'
import BarHooks from './BarHooks'
import LineHooks from './LineHooks'

import './styles.css'

const App = () => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }))

  const [data, setData] = useState(generateData())
  const changeData = () => {
    setData(generateData())
  }

  return (
    <div className='App'>
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      {/* <div>
        <span className='label'>Pie React Class</span>
        <PieClass
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div> */}
      <div>
        <span className='label'>Pie Hooks</span>
        <PieHooks
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
      {/* <div>
        <span className='label'>Pie SVG Elements</span>
        <PieSVG
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div> */}
      <div>
        <span className='label'>Bar Hooks</span>
        <BarHooks
          data={data}
          width={200}
          height={200}
        />
      </div>
      <div>
        <span className='label'>Line Hooks</span>
        <LineHooks
          data={data}
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
