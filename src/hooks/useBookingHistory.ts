import { useEffect, useState } from 'react';

export interface BookingHistoryItem {
    newValue: string;
    changedField: string;
    oldValue: string;
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

const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || '';

export function useBookingHistory(page: number, pageSize: number) {
    const [history, setHistory] = useState<BookingHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${baseUrl}/booking/history?page=${page}&pageSize=${pageSize}`);
                if (!res.ok) throw new Error('Failed to fetch booking history');
                const data = await res.json();
                setHistory(Array.isArray(data.data) ? data.data : []);
                setTotal(typeof data.total === 'number' ? data.total : 0);
                if (!Array.isArray(data.data)) {
                    setError('Format data dari server tidak sesuai.');
                }
            } catch (err: any) {
                setHistory([]);
                setTotal(0);
                setError(err.message || 'Failed to load history');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [page, pageSize]);

    return { history, loading, error, total };
}
