'use client'

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import type { Entities } from '~/features/candles/candlesSlice'
import type { AlternatingFillAreaSeriesProps } from 'react-financial-charts'
import React from 'react'
import { AlternatingFillAreaSeries } from 'react-financial-charts'
import {
 elderRay,
 ema,
 discontinuousTimeScaleProviderBuilder,
 Chart,
 ChartCanvas,
 withDeviceRatio,
 withSize,
} from 'react-financial-charts'
import withDailyData from '~/components/ui/DailyChart/withDailyData'

interface StockChartProps extends Partial<AlternatingFillAreaSeriesProps> {
 readonly data: Entities[]
 readonly height: number
 readonly dateTimeFormat?: string
 readonly width: number
 readonly ratio: number
 readonly openPrice: number
 pricesDisplayFormat?: (
  n:
   | number
   | {
      valueOf(): number
     },
 ) => string
}

class DailyChart extends React.Component<StockChartProps> {
 private readonly margin = { left: 0, right: 0, top: 0, bottom: 0 }

 //  private readonly pricesDisplayFormat = format('.2f')

 private readonly xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
  (d: Entities<Date>) => d.date,
 )

 private readonly barChartExtents = (data: Entities) => {
  return data.volume
 }

 private readonly candleChartExtents = (data: Entities) => {
  return [data.high, data.low]
 }

 private readonly yEdgeIndicator = (data: Entities) => {
  return data.close
 }

 private readonly volumeColor = (data: Entities) => {
  return data.close > data.open ? 'RGB(227, 164, 152)' : 'RGB(136, 176, 225)'
 }

 private readonly volumeSeries = (data: Entities) => {
  return data.volume
 }

 private readonly openCloseColor = (data: Entities) => {
  return data.close > data.open ? '#c84a31' : '#1261c4'
 }

 private readonly yAccessor = (data: Entities) => {
  return data.close
 }

 private readonly yExtents = (data: Entities) => {
  return [data.high, data.low]
 }

 public render() {
  const { data: initialData = [], height, ratio, width, openPrice, ...rest } = this.props

  const ema12 = ema()
   .id(1)
   .options({ windowSize: 12 })
   .merge((d: any, c: any) => {
    d.ema12 = c
   })
   .accessor((d: any) => d.ema12)

  const ema26 = ema()
   .id(2)
   .options({ windowSize: 26 })
   .merge((d: any, c: any) => {
    d.ema26 = c
   })
   .accessor((d: any) => d.ema26)

  const elder = elderRay()

  const calculatedData = elder(ema26(ema12(initialData)))

  const { xScaleProvider } = this
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData)

  const max = xAccessor(data[data.length - 1])
  const min = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [min, max]

  const base = openPrice
  return (
   <ChartCanvas
    height={height}
    ratio={ratio}
    width={width}
    margin={this.margin}
    data={data}
    displayXAccessor={displayXAccessor}
    seriesName="Data"
    xScale={xScale}
    xAccessor={xAccessor}
    xExtents={xExtents}
   >
    {/* @ts-ignore */}
    <Chart id={1} yExtents={this.yExtents}>
     <AlternatingFillAreaSeries
      yAccessor={this.yAccessor}
      baseAt={base}
      {...rest}
      fillStyle={{ top: '#dcaca3', bottom: '#6d9dd8' }}
      strokeStyle={{ top: '#c84a31', bottom: '#1261c4' }}
      strokeWidth={{ bottom: 1, top: 1 }}
     />
    </Chart>
   </ChartCanvas>
  )
 }
}

export const DailyStockChart = withDailyData()(
 withSize({ style: { minHeight: 500, maxHeight: 500 } })(withDeviceRatio()(DailyChart)),
)
