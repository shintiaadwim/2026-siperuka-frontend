import { useState } from 'react';
import { Box, Stack, Typography, CircularProgress, Button, Select, MenuItem } from '@mui/material';
import { useBookingHistory } from '../hooks/useBookingHistory';
import PageWrapper from '../components/layouts/PageWrapper';
import BookingHistoryTable from '../components/common/BookingHistoryTable';

export default function BookingHistoryPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { history, loading, error, total } = useBookingHistory(page, pageSize);

    if (loading) {
        return (
            <PageWrapper title="Booking History">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </PageWrapper>
        );
    }

    if (error) {
        return (
            <PageWrapper title="Booking History">
                <Box textAlign="center" py={4}>
                    <Typography color="error">{error}</Typography>
                </Box>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title="Booking History">
            <Stack spacing={3}>
                <Box>
                    <BookingHistoryTable history={history} page={page} pageSize={pageSize} />
                    {/* Pagination Controls */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Box>
                            <Typography variant="body2">
                                Menampilkan {(page - 1) * pageSize + 1}
                                {history.length > 0 ? ` - ${(page - 1) * pageSize + history.length}` : ''} dari {total} data
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                variant="outlined"
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Prev
                            </Button>
                            <Typography variant="body2">Halaman {page}</Typography>
                            <Button
                                variant="outlined"
                                onClick={() => setPage((p) => (p * pageSize < total ? p + 1 : p))}
                                disabled={page * pageSize >= total}
                            >
                                Next
                            </Button>
                            <Select
                                value={pageSize}
                                onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
                                size="small"
                                sx={{ minWidth: 120, marginLeft: 1 }}
                            >
                                {[10, 20, 50].map(size => (
                                    <MenuItem key={size} value={size}>{size} / halaman</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </PageWrapper>
    );
}
