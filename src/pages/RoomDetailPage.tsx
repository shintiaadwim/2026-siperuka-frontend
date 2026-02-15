import { useParams } from 'react-router-dom';
import { Box, Stack, CircularProgress, Card, CardContent } from '@mui/material';
import { useRoomDetail } from '../hooks/useRoomDetail';
import PageWrapper from '../components/layouts/PageWrapper';
import RoomDetailCard from '../components/common/RoomDetailCard';
import RoomBookingHistoryTable from '../components/common/RoomBookingHistoryTable';

export default function RoomDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { room, bookings, loading, error } = useRoomDetail(id);

    if (loading) {
        return (
            <PageWrapper title="Room Detail">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <CircularProgress />
                </Box>
            </PageWrapper>
        );
    }

    if (error || !room) {
        return (
            <PageWrapper title="Room Detail">
                <Box textAlign="center" py={4}>
                    <span style={{ color: 'red' }}>{error || 'Room not found'}</span>
                </Box>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper title="Room Detail">
            <Stack spacing={3}>
                <Card>
                    <CardContent>
                        <RoomDetailCard room={room} />
                    </CardContent>
                </Card>
                <RoomBookingHistoryTable bookings={bookings} />
            </Stack>
        </PageWrapper>
    );
}
