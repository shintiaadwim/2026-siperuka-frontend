import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(180deg, #07182e 0%, #111 100%)',
                },
            },
        },
    },

});

export default theme;
