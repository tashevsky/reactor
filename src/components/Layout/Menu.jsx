import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box} from '@mui/material';

const Menu = ({ open, onClose }) => {
  const items = [
    'Лабораторная работа 1',
    'Лабораторная работа 2',
    'Лабораторная работа 3',
    'Лабораторная работа 4',
    'Лабораторная работа 5',
    'Лабораторная работа 6',
    'Лабораторная работа 7',
    'Лабораторная работа 8',
    'Лабораторная работа 9'
  ];

  const location = useLocation();

  return (
    <Drawer
      variant='temporary'
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '75%', sm: 300, md: 300 },
          boxSizing: 'border-box',
        },
      }}
    >
        <Box sx={{ p: 2 }}>
            <List>
                <ListItem>
                <ListItemText primary="Лабораторные работы" primaryTypographyProps={{ variant: 'h6' }} />
                </ListItem>
                {items.map((item, index) => (
                <ListItem
                    key={index}
                    component={RouterLink}
                    to={`/lab/${index + 1}`}
                    selected={location.pathname === `/lab/${index + 1}`}
                    onClick={onClose}
                    style={{color: 'inherit'}}
                >
                    <ListItemText primary={item} />
                </ListItem>
                ))}
            </List>
        </Box>
    </Drawer>
  );
};

export default Menu;