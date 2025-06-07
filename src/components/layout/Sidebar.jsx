import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
  CalendarMonth as CalendarIcon,
  ViewKanban as KanbanIcon,
  BarChart as ChartIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Tables', icon: <TableIcon />, path: '/tables' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Kanban', icon: <KanbanIcon />, path: '/kanban' },
  { text: 'Charts', icon: <ChartIcon />, path: '/charts' },
];

const Sidebar = ({ open, onClose, variant }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const drawerWidth = 240;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const drawer = (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.paper',
      boxShadow: isDesktop ? '2px 0 8px rgba(0,0,0,0.05)' : 'none',
    }}>
      <Box sx={{ 
        p: { xs: 2, sm: 2.5 }, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            letterSpacing: '0.5px',
          }}
        >
          Admin Dashboard
        </Typography>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <List sx={{ 
        flexGrow: 1,
        px: { xs: 1, sm: 1.5 },
        py: 2,
        '& .MuiListItemButton-root': {
          borderRadius: 1,
          mb: 0.5,
          mx: 0.5,
        }
      }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: { xs: 36, sm: 40 },
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        p: 2, 
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        bgcolor: 'background.paper',
      }}>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            opacity: 0.8,
          }}
        >
          © 2024 Admin Dashboard
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar; 