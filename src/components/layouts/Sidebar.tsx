import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HistoryIcon from "@mui/icons-material/History";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Booking", path: "/bookings", icon: <BookOnlineIcon /> },
  { name: "Room", path: "/rooms", icon: <MeetingRoomIcon /> },
  { name: "Booking History", path: "/booking-history", icon: <HistoryIcon /> },
];


export default function Sidebar({ open, onClose, variant }: SidebarProps) {
  const location = useLocation();
  const isTemporary = variant === 'temporary';
  return (
    <Drawer
      variant={typeof variant === 'string' ? variant : 'temporary'}
      open={open}
      onClose={onClose}
      anchor="left"
      ModalProps={{ keepMounted: true }}
      sx={{
        width: 220,
        flexShrink: 0,
        display: variant === 'permanent' ? { xs: 'none', md: 'block' } : undefined,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={isTemporary ? () => { console.log('Sidebar menu clicked, closing drawer'); onClose(); } : undefined}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}