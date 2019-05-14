import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const Line = props => {
  const ref = useRef(null)
  const margin = ({ top: 20, right: 30, bottom: 30, left: 40 })

  const x = d3.scaleLinear()
    .domain(d3.extent(props.data, d => d.date))
    .range([margin.left, props.width - margin.right])

  const y = d3.scaleLinear()
    .domain([0, d3.max(props.data, d => d.value)]).nice()
    .range([props.height - margin.bottom, margin.top])

  useEffect(
    () => {
      const xAxis = g => g
        .attr('transform', `translate(0,${props.height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(props.width / 80).tickSizeOuter(0))

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(props.data.y))

      const line = d3.line()
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value))

      const svg = d3.select(ref.current)
      svg.append('g')
        .call(xAxis)

      svg.append('g')
        .call(yAxis)

      // const svgWithData = svg.selectAll('g').remove().exit().data(props.data)

      // const svgWithUpdate = svgWithData
      //   .enter()

      svg.append('path')
        .datum(props.data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', line)
    },
    [props.width, props.data, margin.bottom, margin.left, props.height, x, y]
  )

  return (
    <svg width={props.width} height={props.height} ref={ref} />
  )
}

export default Line
