import type { BookingCreateDto, BookingListItem, BookingListResponse } from '../types/booking';

const baseUrl = import.meta.env.VITE_API_URL
const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : ''

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}
// Get all bookings with pagination
export async function getBookings(page: number = 1, pageSize: number = 10) {
    ensureBaseUrl();
    const url = new URL('/api/booking', normalizedBaseUrl);
    url.searchParams.set('page', String(page));
    url.searchParams.set('pageSize', String(pageSize));
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }
    const res = await response.json();
    // Jika response array langsung, bungkus sebagai BookingListResponse
    if (Array.isArray(res)) {
        return {
            data: res,
            total: res.length,
            page: 1,
            pageSize: res.length
        };
    }
    return res as BookingListResponse;
}
// Create a new booking
export async function createBooking(dto: BookingCreateDto) {
    ensureBaseUrl();
    const url = new URL('/api/booking', normalizedBaseUrl);
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!response.ok) {
        throw new Error('Failed to create booking');
    }
    return (await response.json()) as BookingListItem;
}
// Update an existing booking
export async function updateBooking(id: number, dto: BookingCreateDto) {
    ensureBaseUrl();
    const url = new URL(`/api/booking/${id}`, normalizedBaseUrl);
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update booking');
    }
    const text = await response.text();
    if (!text) {
        return dto as any; // Return the dto if backend returns empty response
    }
    try {
        return JSON.parse(text) as BookingListItem;
    } catch (e) {
        console.error('Failed to parse response:', text);
        return dto as any;
    }
}
// Update booking status
export async function updateBookingStatus(id: number, newStatusId: number, note?: string) {
    ensureBaseUrl();
    const url = new URL(`/api/booking/${id}/status`, normalizedBaseUrl);
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStatusId, note }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update booking status');
    }
    const text = await response.text();
    if (!text) {
        return true as any;
    }
    try {
        return JSON.parse(text) as BookingListItem;
    } catch (e) {
        return true as any;
    }
}
// Delete a booking
export async function deleteBooking(id: number) {
    ensureBaseUrl();
    const url = new URL(`/api/booking/${id}`, normalizedBaseUrl);
    const response = await fetch(url, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete booking');
    }
    return true;
}
// Booking history
export async function getBookingHistory() {
    ensureBaseUrl();
    const url = new URL('/booking/history/', normalizedBaseUrl);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch booking history');
    }
    return (await response.json()) as BookingListItem[];
}

