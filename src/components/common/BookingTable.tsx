import { Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Select, MenuItem, Tooltip, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import type { BookingListItem } from '../../types/booking';

interface BookingTableProps {
    bookings?: BookingListItem[];
    statuses?: any[];
    onStatusChange?: (bookingId: number, statusId: number) => void;
    statusLoading?: boolean;
    loading?: boolean;
    error?: string | null;
    onEdit?: (booking: BookingListItem) => void;
    onDelete?: (bookingId: number) => void;
    page?: number;
    pageSize?: number;
    total?: number;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onPageSizeChange?: (event: any) => void;
}

export default function BookingTable(props: BookingTableProps) {
    const { bookings = [], statuses = [], onStatusChange, statusLoading, loading, error, page = 1, pageSize = 10, total = 0, onPageChange, onPageSizeChange } = props;

    const getStatusStyles = (statusName?: string) => {
        const normalized = (statusName || '').toLowerCase();
        if (normalized.includes('approve')) {
            return { backgroundColor: '#E8F5E9', color: '#1B5E20', borderColor: '#66BB6A' };
        }
        if (normalized.includes('reject')) {
            return { backgroundColor: '#FFEBEE', color: '#B71C1C', borderColor: '#EF5350' };
        }
        if (normalized.includes('pending')) {
            return { backgroundColor: '#FFF3E0', color: '#E65100', borderColor: '#FFB74D' };
        }
        if (normalized.includes('cancel')) {
            return { backgroundColor: '#EEEEEE', color: '#424242', borderColor: '#9E9E9E' };
        }
        return { backgroundColor: '#F5F5F5', color: '#424242', borderColor: '#BDBDBD' };
    };

    // Hybrid: jika backend tidak support pagination, lakukan paginasi di frontend
    const isClientPagination = !props.total || props.total === bookings.length;
    const clientTotal = bookings.length;
    let pagedBookings = bookings;
    if (isClientPagination) {
        pagedBookings = bookings.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    } else {
        // Jika backend support pagination, bookings harus sudah data per halaman
        if (bookings.length === 0 && page > 1) {
            console.warn('Tidak ada data di halaman ini. Cek apakah backend mengembalikan data per halaman dengan benar.');
        }
    }
    const paginationTotal = isClientPagination ? clientTotal : total;
    const totalPages = Math.ceil(paginationTotal / pageSize);

    return (
        <>
            <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2, width: '100%', '& td, & th': { fontSize: '14px' } }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ height: 50 }}>
                            <TableCell align="center">NO.</TableCell>
                            <TableCell align="center">ROOM</TableCell>
                            <TableCell align="center">USERNAME</TableCell>
                            <TableCell align="center">DATE</TableCell>
                            <TableCell align="center">START TIME</TableCell>
                            <TableCell align="center">END TIME</TableCell>
                            <TableCell align="center">PURPOSE</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ color: 'red' }}>{error}</TableCell>
                            </TableRow>
                        ) : pagedBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    Tidak ada data booking
                                </TableCell>
                            </TableRow>
                        ) : (
                            pagedBookings.map((booking, index) => (
                                <TableRow key={booking.id} sx={{ height: 30 }}>
                                    <TableCell align="center">{(pageSize * (page - 1)) + index + 1}</TableCell>
                                    <TableCell>{booking.room?.roomName || '-'}</TableCell>
                                    <TableCell>{booking.user?.name || '-'}</TableCell>
                                    <TableCell align="center">{new Date(booking.date).toLocaleDateString('id-ID')}</TableCell>
                                    <TableCell align="center">{booking.startTime}</TableCell>
                                    <TableCell align="center">{booking.endTime}</TableCell>
                                    <TableCell>{booking.purpose}</TableCell>
                                    <TableCell align="center">
                                        <Select
                                            size="small"
                                            value={booking.status?.id || ''}
                                            onChange={e => onStatusChange && onStatusChange(booking.id, e.target.value as number)}
                                            disabled={statusLoading}
                                            displayEmpty
                                            sx={{
                                                minWidth: 140,
                                                fontWeight: 600,
                                                borderRadius: '999px',
                                                fontSize: '12px',
                                                ...getStatusStyles(booking.status?.statusName),
                                                '& .MuiSelect-select': { py: 0.5, px: 2, textAlign: 'center', fontSize: '14px' },
                                                '& .MuiSelect-icon': { color: 'inherit' },
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' },
                                                '& .MuiMenuItem-root': { fontSize: '14px' },
                                            }}
                                        >
                                            {props.statuses?.map((status: any) => (
                                                <MenuItem key={status.id} value={status.id}>{status.statusName}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center">
                                            <Tooltip title="Edit">
                                                <IconButton color="primary" onClick={() => props.onEdit && props.onEdit(booking)} size="small">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton color="error" onClick={() => props.onDelete && props.onDelete(booking.id)} size="small">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Custom Pagination Controls */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <span style={{ fontSize: 14 }}>
                    Menampilkan {(page - 1) * pageSize + 1}
                    {pagedBookings.length > 0 ? ` - ${(page - 1) * pageSize + pagedBookings.length}` : ''} dari {paginationTotal} data
                </span>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (page === 1) {
                                console.warn('PREV: Sudah di halaman pertama');
                                return;
                            }
                            console.log('PREV clicked', page - 1);
                            onPageChange && onPageChange(null, page - 1);
                        }}
                        disabled={page === 1}
                        size="small"
                    >
                        Prev
                    </Button>
                    <span style={{ fontSize: 14 }}>Halaman {page}</span>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (page >= totalPages) {
                                console.warn('NEXT: Sudah di halaman terakhir', { page, totalPages });
                                return;
                            }
                            console.log('NEXT clicked', page + 1);
                            onPageChange && onPageChange(null, page + 1);
                        }}
                        disabled={page >= totalPages}
                        size="small"
                    >
                        Next
                    </Button>
                    <Select
                        value={pageSize}
                        onChange={onPageSizeChange}
                        size="small"
                        sx={{ minWidth: 120 }}
                        renderValue={(selected) => `${selected} / halaman`}
                    >
                        {[10, 20, 50].map(size => (
                            <MenuItem key={size} value={size}>{size} / halaman</MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Stack>
        </>
    );
}