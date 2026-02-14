import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import PageWrapper from "../components/layouts/PageWrapper";
import RoomCreateDialog from "../components/common/RoomCreateDialog";
import RoomEditDialog from "../components/common/RoomEditDialog";
import useRooms from "../hooks/useRooms";

export default function RoomPage() {
  const {
    rooms, loading, error,
    open, setOpen, form, handleClose, handleChange, handleSubmit,
    // Edit dialog
    editOpen, editForm, handleEditClose, handleEditChange, handleEditSubmit, openEditDialog,
    // Delete handler
    handleDeleteRoom
  } = useRooms();

  return (
    <PageWrapper title="Room">
      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Room
        </Button>
      </Stack>

      <TableContainer sx={{ border: '1px solid #ccc', borderRadius: 2 }}>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ color: 'red' }}>{error}</TableCell>
              </TableRow>
            ) : rooms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">Tidak ada data ruangan</TableCell>
              </TableRow>
            ) : (
              [...rooms]
                .sort((a, b) => a.id - b.id)
                .map((room, idx) => (
                  <TableRow key={room.id} sx={{ height: 30, width: 100 }}>
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell align="center">{room.roomCode}</TableCell>
                    <TableCell align="center">{room.roomName}</TableCell>
                    <TableCell align="center">{room.capacity}</TableCell>
                    <TableCell align="center">{room.location}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={room.roomStatus}
                        color={
                          room.roomStatus === 'Available' ? 'success'
                            : room.roomStatus === 'Maintenance' ? 'warning'
                              : room.roomStatus === 'Reserved' ? 'info'
                                : 'default'
                        }
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600, letterSpacing: 1 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          onClick={() => {/* TODO: open detail dialog */ }}
                        >
                          Detail
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="primary"
                          onClick={() => openEditDialog(room)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteRoom(room.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            )}
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
  )
}
