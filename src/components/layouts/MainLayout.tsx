import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Header />
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 2, bgcolor: '#fff' }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
