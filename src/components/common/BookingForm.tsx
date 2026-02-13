import { TextField, Button, Box, Stack, FormControl, InputLabel, Select, Paper, Typography } from "@mui/material";
import type { BookingCreateForm } from '../../types/booking';

interface BookingCreateProps {
    value: BookingCreateForm;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onChange: (booking: BookingCreateForm) => void;
}

export default function BookingCreate({ value, onSubmit, onChange }: BookingCreateProps) {
    const updateField = (field: keyof BookingCreateForm, nextValue: string | number) => {
        onChange({ ...value, [field]: nextValue })
    }

    return (
        <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Create Booking
            </Typography>

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
                        </Select>
                    </FormControl>

                    {/* User ID Select */}
                    <FormControl required fullWidth variant="outlined">
                        <InputLabel id="user-label">Pengguna</InputLabel>
                        <Select
                            labelId="user-label"
                            label="Pengguna"
                            value={value.userId}
                            onChange={(event) => updateField('userId', event.target.value)}
                        >
                        </Select>
                    </FormControl>

                    {/* Date */}
                    <TextField
                        label="Tanggal"
                        type="date"
                        value={value.date}
                        onChange={(event) => updateField('date', event.target.value)}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    {/* Start Time & End Time */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            label="Waktu Mulai"
                            type="time"
                            value={value.startTime}
                            onChange={(event) => updateField('startTime', event.target.value)}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Waktu Selesai"
                            type="time"
                            value={value.endTime}
                            onChange={(event) => updateField('endTime', event.target.value)}
                            fullWidth
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Stack>

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

                    {/* Status ID Select */}
                    <FormControl required fullWidth variant="outlined">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            value={value.statusId}
                            onChange={(event) => updateField('statusId', event.target.value)}
                        >
                        </Select>
                    </FormControl>

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
