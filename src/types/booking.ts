import type { FormEvent } from "react";

export interface BookingListItem {
    id: number;
    roomId: number;
    userId: number;
    statusId: number;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    room?: {
        id: number;
        roomCode: string;
        roomName: string;
    };
    user?: {
        id?: number;
        name: string;
        email?: string;
    };
    status?: {
        id: number;
        statusBooking: string;
        statusName: string;
    };
}

export interface BookingListResponse {
    total: number;
    page: number;
    pageSize: number;
    data: BookingListItem[];
}

export interface BookingCreateDto {
    roomId: number;
    userId: number;
    statusId: number;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
} // DTO untuk pembuatan booking baru, digunakan saat mengirim data ke backend

export interface BookingFormOption {
    label: string;
    value: number;
} // Opsi untuk dropdown form booking

export type BookingFormProps = {
    value: BookingCreateDto;
    isEditing: boolean;
    isLoading: boolean;
    onChange: (value: BookingCreateDto) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    roomOptions?: BookingFormOption[];
    userOptions?: BookingFormOption[];
}; // Props untuk form booking (create/edit)

export type BookingTableProps = {
    items: BookingListItem[];
    onEdit: (item: BookingListItem) => void;
    onDelete: (id: number) => void;
    onStatusSelect: (id: number, statusId: number) => void;
    onStatusConfirm: () => void;
    onStatusDialogClose: () => void;
    note: string;
    onNoteChange: (value: string) => void;
    pendingId: number | null;
    pendingStatusId: number | null;
    isLoading: boolean;
}; // Props untuk tabel booking

// Form interfaces for dialog components
export interface BookingCreateForm {
    roomId: string;
    userName: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
}

export interface BookingEditForm extends BookingCreateForm {
    id: number;
    userId: number;
    statusId: string;
    user: {
        id?: number;
        name: string;
        email?: string;
    };
}