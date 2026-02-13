import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header: React.FC = () => {
    return (
        <AppBar
            position="fixed"
            color="primary"
            elevation={1}
            sx={{ zIndex: 1201, width: '100vw', left: 0 }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    S I P E R U K A
                </Typography>
                {/* Additional user info, logout button, etc. can be placed here if needed */}
                <Box />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
