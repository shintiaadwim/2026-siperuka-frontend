import type { BookingCreateDto, BookingListItem, BookingListResponse } from '../types/booking';

const baseUrl = import.meta.env.VITE_API_URL

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}
// Get all bookings with pagination
export async function getBookings(page: number, pageSize: number) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/bookings?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }
    return (await response.json()) as BookingListResponse;
}
// Create a new booking
export async function createBooking(dto: BookingCreateDto) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/bookings`, {
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
    const response = await fetch(`${baseUrl}/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!response.ok) {
        throw new Error('Failed to update booking');
    }
    return (await response.json()) as BookingListItem;
}
// Update booking status
export async function updateBookingStatus(id: number, statusId: number, changeBy: string, note?: string) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusId, changeBy, note }),
    });
    if (!response.ok) {
        throw new Error('Failed to update booking status');
    }
    return (await response.json()) as BookingListItem;
}
// Delete a booking
export async function deleteBooking(id: number) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/bookings/${id}`, {
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
    const response = await fetch(`${baseUrl}/bookings/history/`);
    if (!response.ok) {
        throw new Error('Failed to fetch booking history');
    }
    return (await response.json()) as BookingListItem[];
}

