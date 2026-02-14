import React from "react";
import useBookingStatuses from "../hooks/useBookingStatuses";
import { Stack } from "@mui/material";
import PageWrapper from "../components/layouts/PageWrapper";
import BookingCreate from "../components/common/BookingForm";
import BookingTable from "../components/common/BookingTable";
import useBookings from "../hooks/useBookings";
import useRooms from "../hooks/useRooms";
import useUsers from "../hooks/useUsers";
import { createUser, getUsers } from '../services/userService';

export default function BookingPage() {
  const { statuses: bookingStatuses, loading: statusLoading } = useBookingStatuses();
  const {
    bookings, loading, error,
    createBooking,
    // ...tambahkan handler lain jika perlu
    updateBookingStatus,
    updateBooking,
    deleteBooking,
  } = useBookings();
  // State untuk edit booking
  const [editingBooking, setEditingBooking] = React.useState<any | null>(null);
  const [showEditForm, setShowEditForm] = React.useState(false);

  // Handler edit booking
  const handleEdit = (booking: any) => {
    setEditingBooking(booking);
    setShowEditForm(true);
  };

  // Handler submit edit booking
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;
    try {
      await updateBooking(editingBooking.id, editingBooking);
      setShowEditForm(false);
      setEditingBooking(null);
    } catch (err) {
      alert('Gagal update booking: ' + (err.message || err));
    }
  };

  // Handler delete booking
  const handleDelete = async (bookingId: number) => {
    if (window.confirm('Yakin ingin menghapus booking ini?')) {
      await deleteBooking(bookingId);
    }
  };
  // Handler untuk update status booking
  const handleStatusChange = async (bookingId: number, statusId: number) => {
    await updateBookingStatus(bookingId, statusId);
  };
  const [localBookings, setLocalBookings] = React.useState<any[]>([]);
  const { rooms } = useRooms();
  const { users } = useUsers();

  // Sinkronisasi: hapus booking lokal jika sudah ada di backend
  React.useEffect(() => {
    if (localBookings.length === 0) return;
    setLocalBookings(prev => prev.filter(local => {
      // Cek apakah booking dengan data yang sama sudah ada di backend
      const found = bookings.some(b =>
        b.roomId === local.roomId &&
        b.date === local.date &&
        b.startTime === local.startTime &&
        b.endTime === local.endTime &&
        b.purpose === local.purpose
      );
      return !found;
    }));
  }, [bookings]);

  // Dummy form state & handler (bisa diimprove sesuai kebutuhan)
  const [form, setForm] = React.useState<any>({
    roomId: '',
    userName: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: ''
  });
  const handleChange = (next: any) => setForm(next);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Set statusId otomatis ke id status 'Pending'
      let statusId = 1; // Default Pending status ID
      if (bookingStatuses && bookingStatuses.length > 0) {
        const pendingStatus = bookingStatuses.find((s: any) => s.statusName === 'Pending');
        statusId = pendingStatus ? pendingStatus.id : bookingStatuses[0].id;
      }

      let userId = 1;
      let userName = form.userName;
      // Jika userName diinput, create user baru ke backend
      if (userName) {
        try {
          const userRes = await createUser(userName);
          userId = userRes.id;
          userName = userRes.name;
        } catch (err) {
          alert('Gagal membuat user: ' + (err.message || err));
          return;
        }
      }

      const bookingData = {
        roomId: Number(form.roomId),
        userId,
        statusId,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        purpose: form.purpose,
      };

      console.log('Booking data to send:', bookingData);

      // Kirim booking
      await createBooking(bookingData);

      // Reset form setelah berhasil
      setForm({
        roomId: '',
        userName: '',
        date: '',
        startTime: '',
        endTime: '',
        purpose: ''
      });
    } catch (err) {
      console.error('Error creating booking:', err);
    }
  };
  return (
    <PageWrapper title="Booking">
      <Stack spacing={2}>
        <BookingCreate
          value={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          rooms={rooms}
          users={users}
          bookings={bookings}
          statuses={bookingStatuses}
          statusLoading={statusLoading}
        />
        <BookingTable
          bookings={bookings.map(b => {
            if (b.user?.name) return b;
            if (b.userId === 1) {
              const norm = (s: string) => (s || '').toLowerCase().trim().replace(/\s+/g, ' ');
              const bookingKey = `${b.roomId}|${norm(b.date)}|${norm(b.startTime)}|${norm(b.endTime)}|${norm(b.purpose)}`;
              const map = JSON.parse(localStorage.getItem('bookingUserMap') || '{}');
              if (map[bookingKey]) {
                return { ...b, user: { ...(b.user || {}), name: map[bookingKey] } };
              }
            }
            return b;
          })}
          statuses={bookingStatuses}
          onStatusChange={handleStatusChange}
          statusLoading={statusLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Form edit booking (re-use BookingCreate) */}
        {showEditForm && editingBooking && (
          <BookingCreate
            value={editingBooking}
            onChange={next => setEditingBooking(next)}
            onSubmit={handleEditSubmit}
            rooms={rooms}
            users={users}
            bookings={bookings}
            statuses={bookingStatuses}
            statusLoading={statusLoading}
            isEditing
          />
        )}
      </Stack>
    </PageWrapper>
  );
}
