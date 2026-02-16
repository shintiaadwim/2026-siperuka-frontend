import { Button, Stack } from "@mui/material";
import useBookingStatuses from "../hooks/useBookingStatuses";
import PageWrapper from "../components/layouts/PageWrapper";
import BookingTable from "../components/common/BookingTable";
import BookingCreateDialog from "../components/common/BookingCreateDialog";
import BookingEditDialog from "../components/common/BookingEditDialog";
import useBookings from "../hooks/useBookings";
import useRooms from "../hooks/useRooms";
import { mapBookingsWithLocalStorage } from "../utils/bookingHelpers";

export default function BookingPage() {
  const { statuses: bookingStatuses, loading: statusLoading } = useBookingStatuses();
  const {
    bookings,
    loading,
    error,
    updateBookingStatus,
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
  } = useBookings(bookingStatuses);
  const { rooms } = useRooms();

  const handleStatusChange = async (bookingId: number, statusId: number) => {
    await updateBookingStatus(bookingId, statusId);
  }; // Handler untuk update status booking

  const mappedBookings = mapBookingsWithLocalStorage(bookings); // Map bookings dengan localStorage

  return (
    <PageWrapper title="Booking">
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setCreateOpen(true)}>
          Create Booking
        </Button>
      </Stack>

      <BookingTable
        bookings={mappedBookings}
        statuses={bookingStatuses}
        onStatusChange={handleStatusChange}
        statusLoading={statusLoading}
        loading={loading}
        error={error}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={handleChangePage}
        onPageSizeChange={handleChangePageSize}
      />

      <BookingCreateDialog
        open={createOpen}
        value={createForm}
        onClose={handleCloseCreate}
        onChange={setCreateForm}
        onSubmit={handleSubmitCreate}
        rooms={rooms}
        bookings={bookings}
      />

      <BookingEditDialog
        open={editOpen}
        value={editForm}
        onClose={handleCloseEdit}
        onChange={handleEditChange}
        onSubmit={handleSubmitEdit}
        rooms={rooms}
        bookings={bookings}
        statuses={bookingStatuses}
        statusLoading={statusLoading}
      />
    </PageWrapper>
  );
}
