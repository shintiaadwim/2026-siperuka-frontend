import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header: React.FC = () => {
    return (
        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                zIndex: 1201,
                width: '100vw',
                left: 0,
                background: 'linear-gradient(180deg, #07182e 0%, #111 100%)',
                backgroundColor: 'transparent',
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ fontWeight: 900 }}
                >
                    S I P E R U K A
                </Typography>
                {/* Additional user info, logout button, etc. can be placed here if needed */}
                <Box />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
