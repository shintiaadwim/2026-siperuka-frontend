import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

export default theme;
