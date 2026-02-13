import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PageWrapper from "../components/layouts/PageWrapper";
import RoomCreateDialog from "../components/common/RoomCreateDialog";
import useRooms from "../hooks/useRooms";

export default function RoomPage() {
  const {
    open, setOpen, form, handleClose, handleChange, handleSubmit, } = useRooms();

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
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Kode</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Kapasitas</TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </TableContainer>

      <RoomCreateDialog
        open={open}
        value={form}
        onClose={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </PageWrapper>
  )
}
