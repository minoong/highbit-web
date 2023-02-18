import type { AskBid, Change } from '~/types/apis/common'

export type Trade = {
 type: string
 code: string
 trade_price: number
 trade_volume: number
 ask_bid: AskBid
 prev_closing_price: number
 change: Change
 change_price: number
 trade_date: string
 trade_time: string
 trade_timestamp: string
 timestamp: string
 sequential_id: string
 stream_type: 'SNAPSHOT' | 'REALTIME'
}
