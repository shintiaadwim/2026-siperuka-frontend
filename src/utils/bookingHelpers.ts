import type { BookingListItem } from '../types/booking';

export const normalizeString = (s: string): string => {
    return (s || '').toLowerCase().trim().replace(/\s+/g, ' ');
};

export const mapBookingsWithLocalStorage = (bookings: BookingListItem[]): BookingListItem[] => {
    if (!Array.isArray(bookings)) {
        return [];
    }
    return bookings.map(booking => {
        if (booking.user?.name) return booking;
        if (booking.userId === 1) {
            const bookingKey = `${booking.roomId}|${normalizeString(booking.date)}|${normalizeString(booking.startTime)}|${normalizeString(booking.endTime)}|${normalizeString(booking.purpose)}`;
            const map = JSON.parse(localStorage.getItem('bookingUserMap') || '{}');
            if (map[bookingKey]) {
                return {
                    ...booking,
                    user: {
                        id: booking.user?.id || 1,
                        name: map[bookingKey],
                        email: booking.user?.email || ''
                    }
                };
            }
        }
        return booking;
    });
};

export const findPendingStatusId = (statuses: any[], defaultId: number = 1): number => {
    if (!statuses || statuses.length === 0) return defaultId;
    const pendingStatus = statuses.find((s: any) =>
        s.statusName?.toLowerCase() === 'pending'
    );
    return pendingStatus ? pendingStatus.id : (statuses[0]?.id || defaultId);
};
