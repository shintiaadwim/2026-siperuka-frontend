import { useState, useEffect } from 'react';
import { getRooms, createRoom, updateRoom, deleteRoom } from '../services/roomService';
import type { RoomCreateForm, RoomListItem } from '../types/room';

export default function useRooms() {
    const [rooms, setRooms] = useState<RoomListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<RoomCreateForm>({
        roomCode: '',
        roomName: '',
        capacity: '',
        location: '',
        roomStatus: '',
    });
    // Edit dialog state
    const [editOpen, setEditOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<RoomCreateForm>({
        roomCode: '',
        roomName: '',
        capacity: '',
        location: '',
        roomStatus: '',
    });

    // Fetch all rooms (no pagination)
    const fetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getRooms();
            setRooms(res);
        } catch (err: any) {
            setError(err.message || 'Gagal memuat data ruangan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleClose = () => {
        setOpen(false);
        setForm({
            roomCode: '',
            roomName: '',
            capacity: '',
            location: '',
            roomStatus: '',
        });
    };


    const handleChange = (next: RoomCreateForm) => {
        setForm(next);
    };
    const handleEditChange = (next: RoomCreateForm) => {
        setEditForm(next);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createRoom({
                ...form,
                capacity: Number(form.capacity),
            });
            handleClose();
            fetchRooms();
        } catch (err: any) {
            setError(err.message || 'Gagal membuat ruangan');
        }
    };

    // Edit dialog handlers
    const openEditDialog = (room: RoomListItem) => {
        setEditId(room.id);
        setEditForm({
            roomCode: room.roomCode,
            roomName: room.roomName,
            capacity: room.capacity,
            location: room.location,
            roomStatus: room.roomStatus,
        });
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
        setEditId(null);
        setEditForm({
            roomCode: '',
            roomName: '',
            capacity: '',
            location: '',
            roomStatus: '',
        });
    };
    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editId) return;
        try {
            await updateRoom(editId, {
                ...editForm,
                capacity: Number(editForm.capacity),
            });
            handleEditClose();
            fetchRooms();
        } catch (err: any) {
            setError(err.message || 'Gagal mengupdate ruangan');
        }
    };

    const handleDeleteRoom = async (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus ruangan ini?')) {
            try {
                await deleteRoom(id);
                fetchRooms();
            } catch (err: any) {
                setError(err.message || 'Gagal menghapus ruangan');
            }
        }
    };

    return {
        rooms,
        loading,
        error,
        open,
        setOpen,
        form,
        handleClose,
        handleChange,
        handleSubmit,
        fetchRooms,
        // Edit dialog
        editOpen,
        setEditOpen,
        editId,
        editForm,
        handleEditClose,
        handleEditChange,
        handleEditSubmit,
        openEditDialog,
        // Delete handler
        handleDeleteRoom,
    };
}
