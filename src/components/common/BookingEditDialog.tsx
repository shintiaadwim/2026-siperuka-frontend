import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import type { BookingEditForm } from '../../types/booking';

interface BookingEditDialogProps {
    open: boolean;
    value: BookingEditForm;
    onClose: () => void;
    onChange: (value: BookingEditForm) => void;
    onSubmit: (event: React.FormEvent) => void;
    rooms: any[];
    bookings: any[];
    statuses: any[];
    statusLoading: boolean;
}

export default function BookingEditDialog({ open, value, onClose, onChange, onSubmit, rooms, bookings, statuses, statusLoading }: BookingEditDialogProps) {
    const updateField = (field: keyof BookingEditForm, nextValue: string | number) => {
        onChange({ ...value, [field]: nextValue as string });
    };

    // Filter bookings untuk ruangan dan tanggal yang dipilih (exclude booking yang sedang diedit)
    const filteredBookings = (Array.isArray(bookings) ? bookings : []).filter(
        b => b.roomId === Number(value.roomId) && b.date === value.date
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogContent dividers>
                {/* Tampilkan status booking ruangan pada tanggal yang dipilih */}
                {value.roomId && value.date && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            Room Status on {new Date(value.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}:
                        </Typography>
                        {filteredBookings.length === 0 ? (
                            <Typography variant="body2" color="success.main">Room is available, no bookings yet.</Typography>
                        ) : (
                            filteredBookings.map((b, idx) => (
                                <Typography key={idx} variant="body2" color="error.main">
                                    Booked by {b.user?.name || '-'} from {b.startTime} to {b.endTime}
                                </Typography>
                            ))
                        )}
                    </Box>
                )}

                <Box component="form" id="booking-edit-form" onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <FormControl required fullWidth>
                            <InputLabel id="room-label" sx={{ backgroundColor: '#fff', padding: '0 6px' }}>Room</InputLabel>
                            <Select
                                labelId="room-label"
                                value={value.roomId}
                                onChange={(event) => updateField('roomId', event.target.value)}
                            >
                                {rooms.map((room: any) => (
                                    <MenuItem key={room.id} value={room.id}>{room.roomName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Username"
                            value={value.userName}
                            onChange={(event) => updateField('userName', event.target.value)}
                            fullWidth
                            required
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={value.date ? new Date(value.date + 'T00:00:00') : null}
                                onChange={date => {
                                    if (date) {
                                        const year = date.getFullYear();
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const day = String(date.getDate()).padStart(2, '0');
                                        updateField('date', `${year}-${month}-${day}`);
                                    } else {
                                        updateField('date', '');
                                    }
                                }}
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                                format="dd MMMM yyyy"
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TimePicker
                                    label="Start Time"
                                    value={value.startTime ? new Date(`1970-01-01T${value.startTime}`) : null}
                                    onChange={time => {
                                        if (time) {
                                            const hours = String(time.getHours()).padStart(2, '0');
                                            const minutes = String(time.getMinutes()).padStart(2, '0');
                                            updateField('startTime', `${hours}:${minutes}`);
                                        } else {
                                            updateField('startTime', '');
                                        }
                                    }}
                                    slotProps={{ textField: { fullWidth: true, required: true } }}
                                />
                                <TimePicker
                                    label="End Time"
                                    value={value.endTime ? new Date(`1970-01-01T${value.endTime}`) : null}
                                    onChange={time => {
                                        if (time) {
                                            const hours = String(time.getHours()).padStart(2, '0');
                                            const minutes = String(time.getMinutes()).padStart(2, '0');
                                            updateField('endTime', `${hours}:${minutes}`);
                                        } else {
                                            updateField('endTime', '');
                                        }
                                    }}
                                    slotProps={{ textField: { fullWidth: true, required: true } }}
                                />
                            </Stack>
                        </LocalizationProvider>

                        <TextField
                            label="Purpose"
                            value={value.purpose}
                            onChange={(event) => updateField('purpose', event.target.value)}
                            fullWidth
                            required
                            multiline
                            rows={3}
                        />

                        <FormControl required fullWidth>
                            <InputLabel id="status-label" sx={{ backgroundColor: '#fff', padding: '0 6px' }}>Booking Status</InputLabel>
                            <Select
                                labelId="status-label"
                                value={value.statusId}
                                onChange={(event) => updateField('statusId', event.target.value)}
                                disabled={statusLoading}
                            >
                                {statuses.map((status: any) => (
                                    <MenuItem key={status.id} value={status.id}>{status.statusName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="booking-edit-form" variant="contained">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
