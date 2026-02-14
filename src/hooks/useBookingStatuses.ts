import { useEffect, useState } from 'react';
import { getBookingStatuses } from '../services/bookingStatusService';

export default function useBookingStatuses() {
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStatuses() {
            setLoading(true);
            setError(null);
            try {
                const data = await getBookingStatuses();
                setStatuses(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchStatuses();
    }, []);

    return { statuses, loading, error };
}
