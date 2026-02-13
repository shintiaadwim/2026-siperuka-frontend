import type { RoomCreateForm, RoomListItem, RoomListResponse } from '../types/room';

const baseUrl = import.meta.env.VITE_API_URL

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}
// Get all rooms with pagination
export async function getRooms(page: number, pageSize: number) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/rooms?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
        throw new Error('Failed to fetch rooms');
    }
    return (await response.json()) as RoomListResponse;
}
// Create a new room
export async function createRoom(dto: RoomCreateForm) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/rooms`, {
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
    const response = await fetch(`${baseUrl}/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!response.ok) {
        throw new Error('Failed to update room');
    }
    return (await response.json()) as RoomListItem;
}
