interface OrderbookUnit {
 ask_price: number
 bid_price: number
 ask_size: number
 bid_size: number
}

export type Orderbook = {
 type: string
 code: string
 total_ask_size: string
 total_bid_size: string
 orderbook_units: OrderbookUnit[]
 ask_price: string
 bid_price: string
 ask_size: string
 bid_size: string
 timestamp: string
}
