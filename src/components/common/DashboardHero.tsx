import { Box, Typography, Stack, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DashboardHero() {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/bookings');
    };
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'linear-gradient(180deg, #07182eff 0%, #111 100%)',
                m: 0,
                p: 0,
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 10,
            }}
        >
            <Box sx={{ maxWidth: '2000px', px: 2 }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        color: '#fff',
                        mb: 2,
                        fontSize: { xs: 32, sm: 48, md: 64 },
                        textAlign: 'center',
                    }}
                >
                    Welcome to {' '}
                    <Box component="span" sx={{ color: '#2196f3' }}>
                        Siperuka
                    </Box>
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#b0bec5',
                        mb: 3,
                        maxWidth: 1000,
                        textAlign: 'center',
                        fontSize: { xs: 12, sm: 16, md: 18 },
                        mx: 'auto',
                    }}
                >
                    "Campus Room Booking Management System"<br />
                    An ASP.NET (backend) and React TypeScript (frontend) web application using Material UI as an interface design framework. This system was developed to support centralized, documented, and modern software development standards-compliant campus space rental management.<br />
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2, width: '100%' }}>
                    <TextField
                        variant="outlined"
                        placeholder="Write your booking details here! :D"
                        sx={{
                            background: '#111827',
                            borderRadius: 2,
                            input: { color: '#fff' },
                            width: { xs: '100%', sm: 300 },
                            mx: 'auto',
                        }}
                        InputProps={{
                            style: { color: '#fff' }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ px: 4, py: 1.5, fontWeight: 600, fontSize: 18, borderRadius: 2 }}
                        onClick={handleStart}
                    >
                        Start now
                    </Button>
                </Stack>

                <Typography variant="body2" sx={{ color: '#b0bec5', textAlign: 'center' }}>
                    Developed by {' '}
                    <Link href="#" underline="hover" sx={{ color: '#fff', fontWeight: 600 }}>
                        Shintia Aranzadwi Melati
                    </Link> - D4 Informatics Engineering, Electronic Engineering Polytechnic Institute of Surabaya.
                </Typography>

                <Typography variant="body2" sx={{ color: '#b0bec5', textAlign: 'center' }}>
                    By clicking "Start now", you will be directed to the {' '}
                    <Link href="#" underline="hover" sx={{ color: '#fff', fontWeight: 600 }}>
                        Booking Room Page
                    </Link>.
                </Typography>
            </Box>
        </Box>
    );
}
