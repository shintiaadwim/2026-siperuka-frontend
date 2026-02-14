import { TextField, Button, Box, Stack, FormControl, InputLabel, Select, Paper, Typography, MenuItem, CircularProgress } from "@mui/material";
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface BookingCreateForm {
    roomId: string;
    userId: string;
    userName?: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    statusId: string;
}

interface BookingCreateProps {
    value: BookingCreateForm;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onChange: (booking: BookingCreateForm) => void;
    bookings?: any[];
    rooms?: any[];
    users?: any[];
    statuses?: any[];
    statusLoading?: boolean;
}
export default function BookingCreate({ value, onSubmit, onChange, bookings = [], rooms = [], users = [], statuses = [], statusLoading = false }: BookingCreateProps) {
    const updateField = (field: keyof BookingCreateForm, nextValue: string | number) => {
        onChange({ ...value, [field]: nextValue })
    }

    // Filter bookings untuk ruangan dan tanggal yang dipilih
    const filteredBookings = bookings.filter(
        b => b.room?.id === value.roomId && b.date === value.date
    );

    return (
        <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Create Booking
            </Typography>

            {/* Tampilkan status booking ruangan pada tanggal yang dipilih */}
            {value.roomId && value.date && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Status Ruangan pada {new Date(value.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}:
                    </Typography>
                    {filteredBookings.length === 0 ? (
                        <Typography variant="body2" color="success.main">Ruangan kosong, belum ada booking.</Typography>
                    ) : (
                        filteredBookings.map((b, idx) => (
                            <Typography key={idx} variant="body2" color="error.main">
                                Dipinjam oleh {b.user?.name || '-'} jam {b.startTime} - {b.endTime}
                            </Typography>
                        ))
                    )}
                </Box>
            )}

            <Box component="form" onSubmit={onSubmit}>
                <Stack spacing={2}>
                    <FormControl required fullWidth variant="outlined">
                        <InputLabel id="room-label">Ruangan</InputLabel>
                        <Select
                            labelId="room-label"
                            label="Ruangan"
                            value={value.roomId}
                            onChange={(event) => updateField('roomId', event.target.value)}
                        >
                            {rooms.map((room: any) => (
                                <MenuItem key={room.id} value={room.id}>{room.roomName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Nama Pengguna (Text Field) */}
                    <TextField
                        label="Nama Pengguna"
                        value={value.userName || ''}
                        onChange={(event) => updateField('userName', event.target.value)}
                        fullWidth
                        required
                    />

                    {/* Date */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Tanggal"
                            value={value.date ? new Date(value.date) : null}
                            onChange={date => updateField('date', date ? date.toISOString().split('T')[0] : '')}
                            slotProps={{ textField: { fullWidth: true, required: true } }}
                            format="dd MMMM yyyy"
                        />
                    </LocalizationProvider>

                    {/* Start Time & End Time */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TimePicker
                                label="Waktu Mulai"
                                value={value.startTime ? new Date(`1970-01-01T${value.startTime}`) : null}
                                onChange={time => updateField('startTime', time ? time.toISOString().substr(11, 5) : '')}
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />
                            <TimePicker
                                label="Waktu Selesai"
                                value={value.endTime ? new Date(`1970-01-01T${value.endTime}`) : null}
                                onChange={time => updateField('endTime', time ? time.toISOString().substr(11, 5) : '')}
                                slotProps={{ textField: { fullWidth: true, required: true } }}
                            />
                        </Stack>
                    </LocalizationProvider>

                    {/* Purpose */}
                    <TextField
                        label="Tujuan"
                        value={value.purpose}
                        onChange={(event) => updateField('purpose', event.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={3}
                    />

                    {/* Status tidak ditampilkan saat create booking, statusId akan di-set otomatis di handleSubmit */}

                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Button variant="outlined" type="reset">
                            Reset
                        </Button>
                        <Button variant="contained" type="submit">
                            Create Booking
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Paper>
    );
}
