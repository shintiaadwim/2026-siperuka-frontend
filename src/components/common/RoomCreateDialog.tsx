import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Stack, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { RoomCreateForm, RoomCreateDialogProps } from '../../types/room';

export default function RoomCreateDialog({ open, value, onClose, onSubmit, onChange }: RoomCreateDialogProps) {
    const updateField = (field: keyof RoomCreateForm, nextValue: string | number | boolean) => {
        onChange({ ...value, [field]: nextValue })
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Room</DialogTitle>
            <DialogContent dividers>
                <Box component="form" id="room-create-form" onSubmit={onSubmit}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            label="Kode Ruangan"
                            value={value.roomCode}
                            onChange={(event) => updateField('roomCode', event.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Nama Ruangan"
                            value={value.roomName}
                            onChange={(event) => updateField('roomName', event.target.value)}
                            fullWidth
                            required
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            label="Kapasitas"
                            type='number'
                            value={value.capacity}
                            onChange={(event) => updateField('capacity', event.target.value)}
                            inputProps={{ min: 1 }}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Lokasi"
                            value={value.location}
                            onChange={(event) => updateField('location', event.target.value)}
                            fullWidth
                        />
                    </Stack>
                    <FormControl
                        required
                        fullWidth
                        // sx={{ mb: 2 }}
                    >
                        <InputLabel id="room-status-label" sx={{ backgroundColor: '#fff', padding: '0 6px' }}>Status Ruangan</InputLabel>
                        <Select
                            labelId="room-status-label"
                            value={value.roomStatus}
                            onChange={(event) => updateField('roomStatus', event.target.value)}
                        >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Maintenance">Maintenance</MenuItem>
                            <MenuItem value="Reserved">Reserved</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="room-create-form">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

