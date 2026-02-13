import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Booking", path: "/bookings", icon: <BookOnlineIcon /> },
  { name: "Room", path: "/rooms", icon: <MeetingRoomIcon /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 220,
        flexShrink: 0,
        top: '64px', // offset setinggi AppBar (default AppBar MUI height = 64px)
        height: 'calc(100% - 64px)',
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          top: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
