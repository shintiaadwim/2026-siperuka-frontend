import { Box, Toolbar } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import Content from "../components/layouts/Content";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import DashboardPage from "../pages/DashboardPage";
import RoomPage from "../pages/RoomPage";
import BookingPage from "../pages/BookingPage";

function AppLayout() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar />
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar />
                    <Content>
                        <Outlet />
                    </Content>
                </Box>
            </Box>
        </Box>
    )
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/rooms" element={<RoomPage />} />
                    <Route path="/bookings" element={<BookingPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}