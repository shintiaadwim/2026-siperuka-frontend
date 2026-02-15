import type { UserListResponse } from '../types/user';

const baseUrl = import.meta.env.VITE_API_URL;
const normalizedBaseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : '';

function ensureBaseUrl() {
    if (!baseUrl) {
        throw new Error('VITE_API_URL is not defined in environment variables');
    }
}

// Get all users
export async function getUsers(): Promise<UserListResponse> {
    ensureBaseUrl();
    const response = await fetch(`${normalizedBaseUrl}/booking/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

// Get user by ID
export async function getUserById(id: string) {
    ensureBaseUrl();
    const response = await fetch(`${normalizedBaseUrl}/booking/users/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}

// Create user
export async function createUser(name: string, email?: string): Promise<any> {
    ensureBaseUrl();
    // Email dummy jika tidak diisi
    const safeEmail = email || `${name.replace(/\s+/g, '').toLowerCase()}@example.com`;
    const response = await fetch(`${normalizedBaseUrl}/booking/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email: safeEmail, role: 'USER' }),
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    return response.json();
}

// Update user
export async function updateUser(id: number, name: string, role: string = 'USER'): Promise<any> {
    ensureBaseUrl();
    const response = await fetch(`${normalizedBaseUrl}/booking/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role }),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
}
