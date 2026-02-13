import { Stack } from "@mui/material";
import PageWrapper from "../components/layouts/PageWrapper";
import BookingCreate from "../components/common/BookingForm";
import BookingTable from "../components/common/BookingTable";

export default function BookingPage() {

  return (
    <PageWrapper title="Booking">
      <Stack spacing={2}>
        {/* <BookingCreate
          value={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          rooms={rooms}
          users={users}
          statuses={statuses}
        />
        <BookingTable bookings={bookings} /> */}
      </Stack>
    </PageWrapper>
  )
}
