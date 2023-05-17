import { describe, it } from 'vitest'

import { getMarketOrderPriceUnit } from '~/utils/marketOrder'

// All tests within this suite will be run in parallel
describe('marketOrder', () => {
 it('getMarketOrderPriceUnit(0 ~ 0.1) #1', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(0)).eq(0.0001)
  expect(getMarketOrderPriceUnit(0.01)).eq(0.0001)
  expect(getMarketOrderPriceUnit(0.09)).eq(0.0001)
 })

 it('getMarketOrderPriceUnit(0.1 ~ 1) #2', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(0.9)).eq(0.001)
 })

 it('getMarketOrderPriceUnit(1 ~ 10) #3', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(9)).eq(0.01)
 })

 it('getMarketOrderPriceUnit(10 ~ 100) #4', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(999)).eq(1)
 })

 it('getMarketOrderPriceUnit(100 ~ 1,000) #5', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(999)).eq(1)
 })

 it('getMarketOrderPriceUnit(1,000 ~ 10,000) #6', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(9999)).eq(5)
 })

 it('getMarketOrderPriceUnit(10,000 ~ 100,000) #7', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(99999)).eq(10)
 })

 it('getMarketOrderPriceUnit(100,000 ~ 500,000) #8', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(499999)).eq(50)
 })

 it('getMarketOrderPriceUnit(500,000 ~ 1,000,000) #9', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(999999)).eq(100)
 })

 it('getMarketOrderPriceUnit(1,000,000 ~ 2,000,000) #10', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(1999999)).eq(500)
 })

 it('getMarketOrderPriceUnit(2,000,000) #11', async ({ expect }) => {
  expect(getMarketOrderPriceUnit(2000000)).eq(1000)
 })
})
