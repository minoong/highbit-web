export function getMarketOrderPriceUnit(price: number) {
 if (price >= 2000000) {
  return 1000
 }

 const range = [0, 0.1, 1, 10, 100, 1000, 10000, 100000, 500000, 1000000, 2000000]

 let orderPriceUnit = 1000

 for (let i = 0; i < range.length - 1; i++) {
  const from = range[i]
  const to = range[i + 1]

  if (price >= from && price < to) {
   let bundle = 1000

   if (to === 10000) {
    bundle = 2000
   } else if (to === 100000 || to === 500000 || to === 1000000) {
    bundle = 10000
   } else if (to === 2000000) {
    bundle = 4000
   }

   orderPriceUnit = to / bundle
   break
  }
 }

 return orderPriceUnit
}
