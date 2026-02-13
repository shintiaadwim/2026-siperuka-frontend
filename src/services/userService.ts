import type { UserListResponse } from '../types/user';

const baseUrl = import.meta.env.VITE_API_URL

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}

// Get all users
export async function getUsers(): Promise<UserListResponse> {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

// Get user by ID
export async function getUserById(id: string) {
    ensureBaseUrl();
    const response = await fetch(`${baseUrl}/users/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}
