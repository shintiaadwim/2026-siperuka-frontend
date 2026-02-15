import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Typography } from '@mui/material';
import type { BookingHistoryItem } from '../../hooks/useBookingHistory';

interface Props {
    history: BookingHistoryItem[];
    page: number;
    pageSize: number;
}

export default function BookingHistoryTable({ history, page, pageSize }: Props) {
    return (
        <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>NO.</TableCell>
                        <TableCell>ROOM</TableCell>
                        <TableCell>USERNAME</TableCell>
                        <TableCell>BOOKING DATE</TableCell>
                        <TableCell>TIME</TableCell>
                        <TableCell>PURPOSE</TableCell>
                        <TableCell>STATUS CHANGED</TableCell>
                        <TableCell>OLD STATUS</TableCell>
                        <TableCell>NEW STATUS</TableCell>
                        <TableCell>CHANGE TIME</TableCell>
                        <TableCell>NOTE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={11} align="center">
                                Belum ada riwayat perubahan booking
                            </TableCell>
                        </TableRow>
                    ) : (
                        history.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                                <TableCell>
                                    {item.booking?.room?.roomName || '-'}
                                    <br />
                                    <Typography variant="caption" color="textSecondary">
                                        {item.booking?.room?.roomCode || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>{item.booking?.user?.name || '-'}</TableCell>
                                <TableCell>
                                    {item.booking?.date ? new Date(item.booking.date).toLocaleDateString('id-ID') : '-'}
                                </TableCell>
                                <TableCell>
                                    {item.booking?.startTime && item.booking?.endTime ? `${item.booking.startTime} - ${item.booking.endTime}` : '-'}
                                </TableCell>
                                <TableCell>{item.booking?.purpose || '-'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.changedField || 'Status'}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">
                                        {item.oldValue || item.oldStatus || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">
                                        {item.newValue || item.newStatus || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">
                                        {item.changedAt ? new Date(item.changedAt).toLocaleString('id-ID') : '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="caption">
                                        {item.note || '-'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
