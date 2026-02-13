import { useState, useEffect } from "react";
import type { UserListResponse } from '../types/user';

export function useUser() {
    const [user, setUser] = useState<UserListResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch("/api/user")
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => setError(String(err)))
            .finally(() => setLoading(false));
    }, []);

    // Fungsi update user
    const updateUser = async (userData: UserDto) => {
        setLoading(true);
        try {
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            setUser(data);
            setError(null);
        } catch (err) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, updateUser };
}
