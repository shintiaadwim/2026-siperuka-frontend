import type { RoomCreateForm, RoomListItem, RoomListResponse } from '../types/room';

const baseUrl = import.meta.env.VITE_API_URL
const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : ''
const bookingBaseUrl = normalizedBaseUrl ? `${normalizedBaseUrl}/booking` : ''

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}
// Get all rooms with pagination
export async function getRooms() {
    ensureBaseUrl();
    const response = await fetch(`${bookingBaseUrl}/rooms`);
    if (!response.ok) {
        throw new Error('Failed to fetch rooms');
    }
    return (await response.json()) as RoomListResponse[];
}
// Create a new room
export async function createRoom(dto: RoomCreateForm) {
    ensureBaseUrl();
    const response = await fetch(`${bookingBaseUrl}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!response.ok) {
        throw new Error('Failed to create room');
    }
    return (await response.json()) as RoomListItem;
}
// Update an existing room
export async function updateRoom(id: number, dto: RoomCreateForm) {
    ensureBaseUrl();
    const response = await fetch(`${bookingBaseUrl}/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!response.ok) {
        throw new Error('Failed to update room');
    }
    // Handle 204 No Content response
    if (response.status === 204) {
        return null;
    }
    return (await response.json()) as RoomListItem;
}

// Delete a room
export async function deleteRoom(id: number) {
    ensureBaseUrl();
    const response = await fetch(`${bookingBaseUrl}/rooms/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete room');
    }
    return true;
}
