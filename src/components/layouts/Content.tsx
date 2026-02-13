import { Box, Paper } from '@mui/material'

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Paper elevation={0} sx={{ p: 3, minHeight: '80vh' }}>
                {children}
            </Paper>
        </Box>
    )
}