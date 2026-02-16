import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import Content from "../components/layouts/Content";
import Sidebar from "../components/layouts/Sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import DashboardPage from "../pages/DashboardPage";
import RoomPage from "../pages/RoomPage";
import RoomDetailPage from "../pages/RoomDetailPage";
import BookingPage from "../pages/BookingPage";
import BookingHistoryPage from "../pages/BookingHistoryPage";

function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="fixed" color="primary" elevation={1} sx={{ zIndex: 1201, width: '100vw', left: 0 }}>
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setSidebarOpen((prev) => !prev)}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap component="div">
                        S I P E R U K A
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Sidebar
                    open={isMobile ? sidebarOpen : true}
                    onClose={() => setSidebarOpen(false)}
                    variant={isMobile ? 'temporary' : 'permanent'}
                />
                <Box sx={{ flexGrow: 1, width: '100%' }}>
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
                {/* DashboardPage tanpa layout */}
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* Halaman lain tetap pakai layout */}
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/rooms" element={<RoomPage />} />
                    <Route path="/rooms/:id" element={<RoomDetailPage />} />
                    <Route path="/bookings" element={<BookingPage />} />
                    <Route path="/booking-history" element={<BookingHistoryPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}