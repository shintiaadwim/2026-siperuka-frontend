import { useState, useEffect } from "react";
import { createBooking, updateBooking, updateBookingStatus, deleteBooking, getBookings } from "../services/bookingService";
import { createUser, updateUser } from '../services/userService';
import type { BookingListItem, BookingCreateDto, BookingCreateForm, BookingEditForm } from '../types/booking';
import { findPendingStatusId } from '../utils/bookingHelpers';

export default function useBookings(bookingStatuses: any[] = []) {
    const [bookings, setBookings] = useState<BookingListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const allowedPageSizes = [5, 10, 20, 50];
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);

    // Create dialog state
    const [createOpen, setCreateOpen] = useState(false);
    const [createForm, setCreateForm] = useState<BookingCreateForm>({
        roomId: '',
        userName: '',
        date: '',
        startTime: '',
        endTime: '',
        purpose: ''
    });

    // Edit dialog state
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<BookingEditForm>({
        id: 0,
        roomId: '',
        userId: 0,
        userName: '',
        date: '',
        startTime: '',
        endTime: '',
        purpose: '',
        statusId: '',
        user: { name: '' }
    });

    // Fetch bookings with pagination
    const fetchBookings = async (pageArg = page, pageSizeArg = pageSize) => {
        setLoading(true);
        setError(null);
        try {
            const res = await getBookings(pageArg, pageSizeArg);
            let safePageSize = allowedPageSizes.includes(pageSizeArg) ? pageSizeArg : 10;
            if (Array.isArray(res)) {
                setBookings(res);
                setTotal(res.length);
                setPage(pageArg);
                setPageSize(safePageSize);
            } else {
                setBookings(Array.isArray(res.data) ? res.data : []);
                setTotal(typeof res.total === 'number' ? res.total : 0);
                setPage(typeof res.page === 'number' ? res.page : 1);
                setPageSize(allowedPageSizes.includes(res.pageSize) ? res.pageSize : 10);
            }
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
    const handleUpdateBookingStatus = async (id: number, statusId: number, note?: string) => {
        setLoading(true);
        setError(null);
        try {
            await updateBookingStatus(id, statusId, note);
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
    }, [refreshFlag, page, pageSize]);

    // Tambahkan log di fetchBookings utama
    // (Sudah ada di atas, cukup tambahkan log di situ)
    // Pastikan hanya satu deklarasi fetchBookings

    // Handler for page change
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(Math.max(1, newPage)); // Guard: page minimal 1
        console.log('handleChangePage dipanggil, newPage:', newPage);
    };

    // Handler for page size change
    const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(1);
    };

    // Dialog handlers
    const handleCloseCreate = () => {
        setCreateOpen(false);
        setCreateForm({
            roomId: '',
            userName: '',
            date: '',
            startTime: '',
            endTime: '',
            purpose: ''
        });
    };

    const handleCloseEdit = () => {
        setEditOpen(false);
    };

    const handleOpenEdit = (booking: BookingListItem) => {
        const formData: BookingEditForm = {
            id: booking.id,
            roomId: booking.roomId.toString(),
            userId: booking.userId,
            userName: booking.user?.name || '',
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            purpose: booking.purpose,
            statusId: booking.statusId.toString(),
            user: booking.user || { name: '' }
        };
        setEditForm(formData);
        setEditOpen(true);
    };

    // Submit handlers with user creation/update logic
    const handleSubmitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Find pending status ID
            const statusId = findPendingStatusId(bookingStatuses);

            let userId = 1;
            const userName = createForm.userName;

            // Create user if userName is provided
            if (userName) {
                try {
                    const userRes = await createUser(userName);
                    userId = userRes.id;
                } catch (err: any) {
                    throw new Error('Gagal membuat user: ' + (err.message || err));
                }
            }

            const bookingData: BookingCreateDto = {
                roomId: Number(createForm.roomId),
                userId,
                statusId,
                date: createForm.date,
                startTime: createForm.startTime,
                endTime: createForm.endTime,
                purpose: createForm.purpose,
            };

            await createBooking(bookingData);
            setRefreshFlag(flag => !flag);
            handleCloseCreate();
        } catch (err: any) {
            alert(err.message || 'Gagal membuat booking');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update user if name changed
            if (editForm.user && editForm.user.name !== editForm.userName) {
                await updateUser(
                    Number(editForm.userId),
                    editForm.userName,
                    'USER'
                );
            }

            const updateData: BookingCreateDto = {
                roomId: Number(editForm.roomId),
                userId: Number(editForm.userId),
                statusId: Number(editForm.statusId),
                date: editForm.date,
                startTime: editForm.startTime,
                endTime: editForm.endTime,
                purpose: editForm.purpose,
            };

            await updateBooking(editForm.id, updateData);
            setRefreshFlag(flag => !flag);
            handleCloseEdit();
        } catch (err: any) {
            alert(err.message || 'Gagal update booking');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (bookingId: number) => {
        if (window.confirm('Yakin ingin menghapus booking ini?')) {
            await handleDeleteBooking(bookingId);
        }
    };

    const handleEditChange = (value: BookingEditForm) => {
        setEditForm(value);
    };

    return {
        bookings,
        loading,
        error,
        fetchBookings,
        createBooking: handleCreateBooking,
        updateBooking: handleUpdateBooking,
        updateBookingStatus: handleUpdateBookingStatus,
        deleteBooking: handleDeleteBooking,
        refresh: () => setRefreshFlag(flag => !flag),
        // Pagination
        page,
        pageSize,
        total,
        handleChangePage,
        handleChangePageSize,
        // Dialog states
        createOpen,
        setCreateOpen,
        createForm,
        setCreateForm,
        editOpen,
        editForm,
        handleEditChange,
        // Dialog handlers
        handleCloseCreate,
        handleCloseEdit,
        handleOpenEdit,
        handleSubmitCreate,
        handleSubmitEdit,
        handleDelete,
    };
}