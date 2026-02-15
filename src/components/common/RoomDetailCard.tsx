import { Chip, Typography, Box } from '@mui/material';
import type { Room } from '../../types/room';

const ROOM_STATUS_COLORS: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
    Available: 'success',
    Maintenance: 'warning',
    Reserved: 'info',
};

export default function RoomDetailCard({ room }: { room: Room }) {
    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
                {room.roomName}
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} mt={2}>
                <Box display="flex" gap={2}>
                    <Typography variant="body1" fontWeight={600}>Code:</Typography>
                    <Typography variant="body1">{room.roomCode}</Typography>
                </Box>
                <Box display="flex" gap={2}>
                    <Typography variant="body1" fontWeight={600}>Capacity:</Typography>
                    <Typography variant="body1">{room.capacity} orang</Typography>
                </Box>
                <Box display="flex" gap={2}>
                    <Typography variant="body1" fontWeight={600}>Location:</Typography>
                    <Typography variant="body1">{room.location}</Typography>
                </Box>
                <Box display="flex" gap={2}>
                    <Typography variant="body1" fontWeight={600}>Status:</Typography>
                    <Chip
                        label={room.roomStatus}
                        color={ROOM_STATUS_COLORS[room.roomStatus] || 'default'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
