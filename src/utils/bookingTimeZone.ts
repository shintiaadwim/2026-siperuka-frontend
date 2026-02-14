import dayjs, { type Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const WIB_TIMEZONE = 'Asia/Jakarta'

export const toWibFromString = (input: string) => dayjs.tz(input, WIB_TIMEZONE)

export const toWibFromDayjs = (input: Dayjs) => input.tz(WIB_TIMEZONE)