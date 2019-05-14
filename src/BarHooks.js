import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const Bar = props => {
  const ref = useRef(null)
  const margin = ({ top: 20, right: 0, bottom: 30, left: 40 })

  const x = d3.scaleBand()
    .domain(props.data.map(d => d.date))
    .range([margin.left, props.width - margin.right])
    .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, d3.max(props.data, d => d.value)]).nice()
    .range([props.height - margin.bottom, margin.top])

  const colors = d3.scaleOrdinal(d3.schemeCategory10)

  useEffect(
    () => {
      const xAxis = g => g
        .attr('transform', `translate(0,${props.height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove())

      const svg = d3.select(ref.current)
      const svgWithData = svg.selectAll('g').remove().exit().data(props.data)

      const svgWithUpdate = svgWithData
        .enter()

      svgWithUpdate
        .append('g')
        .selectAll('rect')
        .data(props.data)
        .join('rect')
        .attr('x', d => x(d.date))
        .attr('y', d => y(d.value))
        .attr('height', d => y(0) - y(d.value))
        .attr('width', x.bandwidth())
        .attr('fill', (d, i) => colors(i))

      svgWithUpdate.append('g')
        .call(xAxis)

      svgWithUpdate.append('g')
        .call(yAxis)
    },
    [props.data, x, y, margin, props.height, colors]
  )

  return (
    <svg width={props.width} height={props.height} ref={ref} />
  )
}

export default Bar
