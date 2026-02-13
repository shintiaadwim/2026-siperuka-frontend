import type { BookingListItem } from '../types/booking'

export const bookingStatusChoices = [
    { value: 1, text: 'Waiting' },
    { value: 2, text: 'Approved' },
    { value: 3, text: 'Declined' },
    { value: 4, text: 'Cancelled' },
]

export function getBookingRoomDisplay(booking: BookingListItem) {
    if (booking.room) {
        return `${booking.room.roomCode} | ${booking.room.roomName}`
    }
    return `Room ID: ${booking.roomId}`
}

export function getBookingUserDisplay(booking: BookingListItem) {
    return booking.user?.name || `User ID: ${booking.userId}`
}