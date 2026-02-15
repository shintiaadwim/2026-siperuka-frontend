import { Box, Container, Paper } from '@mui/material'

export default function Content({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth={false} disableGutters>
            <Box sx={{ flexGrow: 1, width: '100%', p: 3 }}>
                <Paper elevation={0} sx={{ minHeight: '80vh', width: '100%' }}>
                    {children}
                </Paper>
            </Box>
        </Container>
    )
}