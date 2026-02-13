export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
} // mendefiniskan struktur data untuk satu User

export interface UserListResponse {
    total: number;
    page: number;
    pageSize: number;
    data: User[];
} //  mengembalikan daftar User dengan informasi paginasi
