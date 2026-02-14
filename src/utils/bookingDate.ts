import type { Dayjs } from 'dayjs'
import { toWibFromDayjs, toWibFromString } from './bookingTimeZone'

export const toPickerValue = (input: string) => (input ? toWibFromString(input) : null)

export const toPayloadValue = (input: Dayjs | null) =>
	input ? toWibFromDayjs(input).format('YYYY-MM-DDTHH:mm') : ''

export const toDateValue = (input: string) => (input ? toWibFromString(input) : null)