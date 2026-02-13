import type { FormEvent } from "react";

export interface Room {
    id: number; 
    roomCode: string; 
    roomName: string; 
    capacity: number; 
    location: string; 
    roomStatus: string; 
    createdAt?: string; 
    updatedAt?: string; 
    deletedAt?: string | null;
} // Interface untuk data ruangan dari backend

export interface RoomListResponse {
    total: number;
    page: number;
    pageSize: number;
    data: Room[];
} // Interface untuk response daftar ruangan (paginasi)

export interface RoomCreateDto {
    roomCode: string;
    roomName: string;
    capacity: number;
    location: string;
    roomStatus: string;
} // DTO untuk pembuatan ruangan baru

export interface RoomFormOption {
    label: string;
    value: number;
} // Opsi untuk dropdown form ruangan

export interface RoomListItem {
    id: number;
    roomCode: string;
    roomName: string;
    capacity: number;
    location: string;
    roomStatus: string;
    bookingStatus?: string | null;
}

export interface RoomCreateForm {
    roomCode: string;
    roomName: string;
    capacity: string | number;
    location: string;
    roomStatus: string;
}

export interface RoomCreateDialogProps {
    open: boolean;
    value: RoomCreateForm;
    onClose: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (room: RoomCreateForm) => void;
}

export interface RoomEditDialogProps {
    open: boolean;
    value: RoomCreateForm;
    onClose: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (room: RoomCreateForm) => void;
}