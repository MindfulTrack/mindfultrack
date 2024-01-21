import * as React from 'react';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { PeopleAlt, Support, CalendarMonth, CrisisAlert, BarChart, AccountCircle, AccountBox } from '@mui/icons-material';

interface SideNavBarProps {};

const SideNavBar: React.FC<SideNavBarProps> = () => {

  const drawerWidth = 'fit-content';

  const LINKS = [
    { text: 'Resources', href: '/resources', icon: Support },
    { text: 'Availability', href: '/availability', icon: CalendarMonth },
    { text: 'Waitlist', href: '/waitlist', icon: PeopleAlt },
    { text: 'Crisis', href: 'https://caps.byu.edu/for-students-in-crisis', icon: CrisisAlert },
    { text: 'Profile', href: '/counselor', icon: AccountCircle },
    { text: 'Stats', href: '/dashboard', icon: BarChart },
    { text: 'Schedule', href: '/schedule', icon: CalendarMonth },
  ];
  
  const PLACEHOLDER_LINKS = [
    { text: 'Settings', icon: SettingsIcon, href: '/setting' },
    // { text: 'Support', icon: SupportIcon, href: '/support' },
    { text: 'Logout', icon: LogoutIcon, href: '/' },
  ];

  const isSelected = true;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          top: ['48px', '56px', '64px'],
          height: 'auto',
          bottom: 0,
          backgroundColor: 'primary.main',
          color: 'text.tertiary',
          paddingRight: '.5rem'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Divider /> */}
      <List>
        {LINKS.map(({ text, href, icon: Icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton component={Link} href={href}>
              <ListItemIcon>
                <Icon style={{fontSize: '35px', color: isSelected ? 'red' : 'secondary'}} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List>
        {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon }) => (
            <ListItem key={text} disablePadding>
            <ListItemButton href={href} sx={{flex: 'column'}}>
              <ListItemIcon>
                <Icon sx={{fontSize: '35px', color: 'secondary.main'}}/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavBar;

