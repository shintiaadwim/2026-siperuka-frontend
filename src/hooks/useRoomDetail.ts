import { useEffect, useState } from 'react';
import type { Room } from '../types/room';
import type { BookingListItem } from '../types/booking';

const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || '';

export function useRoomDetail(id?: string) {
    const [room, setRoom] = useState<Room | null>(null);
    const [bookings, setBookings] = useState<BookingListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoomDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch room data
                const roomRes = await fetch(`${baseUrl}/booking/rooms/${id}`);
                if (!roomRes.ok) throw new Error('Failed to fetch room data');
                const roomData = await roomRes.json();
                setRoom(roomData);

                // Fetch bookings for this room
                const bookingsRes = await fetch(`${baseUrl}/booking/filter/by-room?roomId=${id}`);
                if (!bookingsRes.ok) throw new Error('Failed to fetch bookings');
                const bookingsData = await bookingsRes.json();
                setBookings(bookingsData);
            } catch (err: any) {
                setError(err.message || 'Failed to load room details');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchRoomDetail();
        }
    }, [id]);

    return { room, bookings, loading, error };
}
