import type { BookingListItem } from '../types/booking';

export interface BookingHistoryItem {
    id: number;
    bookingId: number;
    booking: {
        id: number;
        date: string;
        startTime: string;
        endTime: string;
        purpose: string;
        room: {
            id: number;
            roomName: string;
            roomCode: string;
        };
        user: {
            id: number;
            name: string;
        };
    };
    oldStatus: string;
    newStatus: string;
    changedAt: string;
    note: string;
}

const baseUrl = import.meta.env.VITE_API_URL;
const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : '';

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}

export async function getBookingHistory() {
    ensureBaseUrl();
    const url = new URL('/booking/history', normalizedBaseUrl);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch booking history');
    }
    return (await response.json()) as BookingHistoryItem[];
}
