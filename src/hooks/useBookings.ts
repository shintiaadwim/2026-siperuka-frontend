import { useState, useEffect } from "react";
import { createBooking, updateBooking, updateBookingStatus, deleteBooking, getBookings } from "../services/bookingService";
import type { BookingListItem, BookingCreateDto } from '../types/booking';

export default function useBookings() {
    const [bookings, setBookings] = useState<BookingListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    // Fetch bookings
    const fetchBookings = async (customPage?: number, customPageSize?: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getBookings(customPage ?? page, customPageSize ?? pageSize);
            setBookings(res.data);
            setTotal(res.total);
            setPage(res.page);
            setPageSize(res.pageSize);
        } catch (err: any) {
            setError(err.message || 'Gagal mengambil data booking');
        } finally {
            setLoading(false);
        }
    };

    // Create bookingaa
    const handleCreateBooking = async (dto: BookingCreateDto) => {
        setLoading(true);
        setError(null);
        try {
            await createBooking(dto);
            setRefreshFlag(flag => !flag);
        } catch (err: any) {
            setError(err.message || 'Gagal membuat booking');
        } finally {
            setLoading(false);
        }
    };

    // Update booking
    const handleUpdateBooking = async (id: number, dto: BookingCreateDto) => {
        setLoading(true);
        setError(null);
        try {
            await updateBooking(id, dto);
            setRefreshFlag(flag => !flag);
        } catch (err: any) {
            setError(err.message || 'Gagal mengupdate booking');
        } finally {
            setLoading(false);
        }
    };

    // Update booking status
    const handleUpdateBookingStatus = async (id: number, statusId: number, changeBy: string, note?: string) => {
        setLoading(true);
        setError(null);
        try {
            await updateBookingStatus(id, statusId, changeBy, note);
            setRefreshFlag(flag => !flag);
        } catch (err: any) {
            setError(err.message || 'Gagal mengupdate status booking');
        } finally {
            setLoading(false);
        }
    };

    // Delete booking
    const handleDeleteBooking = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteBooking(id);
            setRefreshFlag(flag => !flag);
        } catch (err: any) {
            setError(err.message || 'Gagal menghapus booking');
        } finally {
            setLoading(false);
        }
    };

    // Refresh bookings when page, pageSize, or refreshFlag changes
    useEffect(() => {
        fetchBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, refreshFlag]);

    return {
        bookings,
        loading,
        error,
        total,
        page,
        pageSize,
        setPage,
        setPageSize,
        fetchBookings,
        createBooking: handleCreateBooking,
        updateBooking: handleUpdateBooking,
        updateBookingStatus: handleUpdateBookingStatus,
        deleteBooking: handleDeleteBooking,
        refresh: () => setRefreshFlag(flag => !flag),
    };
}