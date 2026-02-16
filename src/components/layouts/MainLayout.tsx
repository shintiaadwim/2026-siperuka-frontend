import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <CssBaseline />
            <Header />
            <Box sx={{ flexGrow: 1 }}>
                <Sidebar open={false} onClose={function (): void {
                    throw new Error('Function not implemented.');
                } } />
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default MainLayout;
