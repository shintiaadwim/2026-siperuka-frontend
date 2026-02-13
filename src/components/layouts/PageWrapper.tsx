import { Stack, Typography } from '@mui/material'

export default function PageWrapper({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <Stack component="section" spacing={2}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {title}
            </Typography>
            {children}
        </Stack>
    )
}