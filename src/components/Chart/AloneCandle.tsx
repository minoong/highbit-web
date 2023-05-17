import type { Change } from '~/types/apis/common'

import { scaleLinear } from 'd3-scale'
import flow from 'lodash/flow'
import React, { useMemo } from 'react'

interface Props {
 width: number
 height: number
 data: {
  opening: number
  trade: number
  high: number
  low: number
 }
 change: Change
}

function AloneCandle(props: Props) {
 const { width, height, data, change } = props

 const yScale = useMemo(() => {
  const { opening, high, low } = data

  const max = Math.max(high - opening, opening - low)

  const scale = scaleLinear()
   .domain([opening - max, opening + max])
   .range([height, 0])

  return scale
 }, [data, height])

 const rectHeight = useMemo(() => {
  const gapAbs = (gap: number) => Math.abs(gap)
  const correct = (input: number) => (input === 0 ? 1 : input)

  const result = flow(gapAbs, correct)(yScale(data.opening) - yScale(data.trade))

  return result
 }, [data.opening, data.trade, yScale])

 const lineWidth = useMemo(() => width / 2, [width])

 return (
  <g>
   <rect
    x={0}
    width={width}
    height={rectHeight}
    y={yScale(Math.max(data.trade, data.opening))}
    fill={change === 'RISE' ? '#C84931' : '#1361C5'}
   />
   <line
    x1={lineWidth}
    x2={lineWidth}
    y1={yScale(data.high)}
    y2={yScale(data.low)}
    stroke={change === 'RISE' ? '#C84931' : '#1361C5'}
   />
  </g>
 )
}

export default React.memo(AloneCandle)
