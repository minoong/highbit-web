import type { AskBid, Change } from '~/types/apis/common'

export type TickerSocket = {
 type: string
 code: string
 opening_price: number
 high_price: number
 low_price: number
 trade_price: number
 prev_closing_price: number
 change: Change
 change_price: number
 signed_change_price: number
 change_rate: string
 signed_change_rate: number
 trade_volume: number
 acc_trade_volume: string
 acc_trade_volume_24h: number
 acc_trade_price: number
 acc_trade_price_24h: number
 trade_date: string
 trade_time: string
 trade_timestamp: string
 ask_bid: AskBid
 acc_ask_volume: string
 acc_bid_volume: string
 highest_52_week_price: number
 highest_52_week_date: string
 lowest_52_week_price: number
 lowest_52_week_date: string
 trade_status: string
 market_state: 'PREVIEW' | 'ACTIVE' | 'DELISTED'
 market_state_for_ios: string
 is_trading_suspended: string
 delisting_date: string
 market_warning: 'NONE' | 'CAUTION'
 timestamp: string
 stream_type: 'SNAPSHOT' | 'REALTIME'
}
