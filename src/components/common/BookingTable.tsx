import { Button, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageWrapper from "../layouts/PageWrapper";
import type { BookingListItem } from '../../types/booking';

interface BookingTableProps {
    bookings?: BookingListItem[];
}

export default function BookingTable({ bookings = [] }: BookingTableProps) {
    return (
        <PageWrapper title="Booking">
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
                <Button variant="contained">
                    Create Booking
                </Button>
            </Stack>

            <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Ruangan</TableCell>
                            <TableCell>Nama Pengguna</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Waktu Mulai</TableCell>
                            <TableCell>Waktu Selesai</TableCell>
                            <TableCell>Tujuan</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Aksi</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    Tidak ada data booking
                                </TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking, index) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{booking.room?.roomName || '-'}</TableCell>
                                    <TableCell>{booking.user?.name || '-'}</TableCell>
                                    <TableCell>{new Date(booking.date).toLocaleDateString('id-ID')}</TableCell>
                                    <TableCell>{booking.startTime}</TableCell>
                                    <TableCell>{booking.endTime}</TableCell>
                                    <TableCell>{booking.purpose}</TableCell>
                                    <TableCell>{booking.status?.statusName || '-'}</TableCell>
                                    <TableCell>
                                        <IconButton size="small" color="primary">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

            </TableContainer>
        </PageWrapper>
    )
};

