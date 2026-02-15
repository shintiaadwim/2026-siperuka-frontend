import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography, Box } from '@mui/material';
import type { BookingListItem } from '../../types/booking';

const BOOKING_STATUS_COLORS: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
    Approved: 'success',
    Rejected: 'error',
    Pending: 'warning',
};

export default function RoomBookingHistoryTable({ bookings }: { bookings: BookingListItem[] }) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom fontWeight={600}>
                Booking History
            </Typography>
            <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>NO.</TableCell>
                            <TableCell>USERNAME</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>START TIME</TableCell>
                            <TableCell>END TIME</TableCell>
                            <TableCell>PURPOSE</TableCell>
                            <TableCell>STATUS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    Belum ada booking untuk ruangan ini
                                </TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking, index) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{booking.user?.name || '-'}</TableCell>
                                    <TableCell>{new Date(booking.date).toLocaleDateString('id-ID')}</TableCell>
                                    <TableCell>{booking.startTime}</TableCell>
                                    <TableCell>{booking.endTime}</TableCell>
                                    <TableCell>{booking.purpose}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={booking.status?.statusName || '-'}
                                            color={BOOKING_STATUS_COLORS[booking.status?.statusName || ''] || 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
