import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import PageWrapper from "../components/layouts/PageWrapper";
import RoomCreateDialog from "../components/common/RoomCreateDialog";
import RoomEditDialog from "../components/common/RoomEditDialog";
import useRooms from "../hooks/useRooms";

function getRoomStatusColor(status: string) {
  switch (status) {
    case 'Available':
      return 'success';
    case 'Maintenance':
      return 'warning';
    case 'Reserved':
      return 'info';
    default:
      return 'default';
  }
}

export default function RoomPage() {
  const navigate = useNavigate();
  const {
    rooms, loading, error, open, setOpen, form, handleClose, handleChange, handleSubmit,
    editOpen, editForm, handleEditClose, handleEditChange, handleEditSubmit, openEditDialog, handleDeleteRoom
  } = useRooms();

  return (
    <PageWrapper title="Room">
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Room
        </Button>
      </Stack>

      <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2, width: '100%' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ height: 50 }}>
              <TableCell align="center">NO.</TableCell>
              <TableCell align="center">CODE</TableCell>
              <TableCell align="center">ROOM NAME</TableCell>
              <TableCell align="center">CAPACITY</TableCell>
              <TableCell align="center">LOCATION</TableCell>
              <TableCell align="center">STATUS</TableCell>
              <TableCell align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
              if (loading) {
                return (
                  <TableRow>
                    <TableCell colSpan={7} align="center">Loading...</TableCell>
                  </TableRow>
                );
              }
              if (error) {
                return (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell>
                  </TableRow>
                );
              }
              if (rooms.length === 0) {
                return (
                  <TableRow>
                    <TableCell colSpan={7} align="center">Tidak ada data ruangan</TableCell>
                  </TableRow>
                );
              }
              return [...rooms]
                .sort((a, b) => a.id - b.id)
                .map((room, idx) => (
                  <TableRow key={room.id} sx={{ height: 30, width: 100 }}>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell>{room.roomCode}</TableCell>
                    <TableCell>{room.roomName}</TableCell>
                    <TableCell align="center">{room.capacity}</TableCell>
                    <TableCell>{room.location}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={room.roomStatus}
                        color={getRoomStatusColor(room.roomStatus)}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600, letterSpacing: 1 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="Detail">
                          <IconButton color="success" onClick={() => navigate(`/rooms/${room.id}`)} size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton color="primary" onClick={() => openEditDialog(room)} size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDeleteRoom(room.id)} size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ));
            })()}
          </TableBody>
        </Table>
      </TableContainer>
      

      <RoomCreateDialog
        open={open}
        value={form}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <RoomEditDialog
        open={editOpen}
        value={editForm}
        onClose={handleEditClose}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
      />
    </PageWrapper>
  );
}
