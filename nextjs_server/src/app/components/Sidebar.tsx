'use client'
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
import { PeopleAlt, Support, CalendarMonth, CrisisAlert, BarChart, AccountCircle, EditAttributes } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { Paper } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
interface SideNavBarProps {
  // sendSidebarWidth: (width: string) => void;
};


const SideNavBar: React.FC<SideNavBarProps> = ({ }) => {

  const drawerWidth = 'fit-content';

  const router = useRouter();
  const handleIconClick = (url: string, id: number, title: string) => {
    const updatedIcons = sidebarItems.map((icon) => ({
      ...icon,
      isSelected: icon.id === id ? !icon.isSelected : false,
    }));

    // Set all isSelected to false in sidebarBottomItems
    const updatedBottomIcons = sidebarBottomItems.map((icon) => ({
      ...icon,
      isSelected: false,
    }));

    setSidebarItems(updatedIcons);
    setSidebarBottomItems(updatedBottomIcons);

    const targetAttribute = title === "Crisis" ? "_blank" : "_self";

    // window.open if it is crisis
    if (targetAttribute === '_blank') {
      window.open(url, '_blank');
      // make the resource icon selected color
      const resourceIcon = sidebarItems.map((icon) => ({
        ...icon,
        isSelected: icon.title === "Resources"
      }));
      setSidebarItems(resourceIcon);
      // move the page to resources for if they return
      router.push('/resources');
    } else {
      // If not '_blank', use router.push as usual
      router.push(url);
    }
  };

  const [sidebarItems, setSidebarItems] = useState(() => {

    return [
      {
        id: 1,
        icon: Support,
        title: "Resources",
        link: "/resources",
        isSelected: true
      },
      {
        id: 2,
        icon: CalendarMonth,
        title: "Availability",
        link: "/availability",
        isSelected: false
      },
      {
        id: 3,
        icon: PeopleAlt,
        title: "Waitlist",
        link: "/waitlist",
        isSelected: false
      },
      {
        id: 4,
        icon: CrisisAlert,
        title: "Crisis",
        link: "https://caps.byu.edu/for-students-in-crisis",
        isSelected: false
      },
      {
        id: 5,
        icon: AccountCircle,
        title: "Profile",
        link: "/counselor",
        isSelected: false
      },
      {
        id: 6,
        icon: BarChart,
        title: "Stats",
        link: "/dashboard",
        isSelected: false
      },
      {
        id: 7,
        icon: CalendarMonth,
        title: "Schedule",
        link: "/schedule",
        isSelected: false
      },
      {
        id: 8,
        icon: EditAttributes,
        title: "Resource Management",
        link: "/editResources",
        isSelected: false
      }
    ];
  });

  const handleBottomIconClick = (url: string, id: number) => {
    const updatedBottomIcons = sidebarBottomItems.map((icon) => ({
      ...icon,
      isSelected: icon.id === id ? !icon.isSelected : false,
    }));

    // Set all isSelected to false in sidebarItems
    const updatedIcons = sidebarItems.map((icon) => ({
      ...icon,
      isSelected: false,
    }));

    setSidebarBottomItems(updatedBottomIcons);
    setSidebarItems(updatedIcons);

    router.push(url);
  };

  const [sidebarBottomItems, setSidebarBottomItems] = useState(() => {
    return [
      {
        id: 1,
        icon: SettingsIcon,
        title: "Settings",
        link: "/settings",
        isSelected: false
      },
      {
        id: 2,
        icon: LogoutIcon,
        title: "Logout",
        link: '/',
        isSelected: false
      }
    ];
  });

  // function getWidth() {
  //   const sidebar = document.getElementById('sidebar');


  //     const drawerWidth = document.getElementById('sidebar')?.clientWidth;
  //     console.log(drawerWidth)
  //     return drawerWidth;

  // }

  // const drawerRef = useRef<HTMLDivElement | null>(null);
  // React.useEffect(() => {
  //   if(drawerRef.current) {
  //     const style = getComputedStyle(drawerRef.current);
  //     const dw = style.width
  //     console.log(dw)
  //   }
  // }, [drawerRef])

  // const sendWidthToLayout = (data: string) => {
  //   sendSidebarWidth(data);
  // }

  return (
    <Drawer
      // ref={drawerRef}
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
          paddingLeft: '.5rem'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ cursor: "pointer" }}>
            <ListItemButton onClick={() => handleIconClick(item.link, item.id, item.title)}>
              <Tooltip title={item.title} slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [20, -20]
                      }
                    }
                  ]
                }
              }}
              >
                <ListItemIcon>
                  {item.icon && (
                    <item.icon
                      sx={{
                        color: item.isSelected ? '#B3F2FF' : 'text.tertiary',
                        fontSize: '40px'
                      }}
                    />
                  )}
                </ListItemIcon>
              </Tooltip>
              {/* <ListItemText primary={item.title} sx={{ color: item.isSelected ? '#B3F2FF' : 'text.tertiary' }} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: 'auto' }} />

      <List>
        {sidebarBottomItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleBottomIconClick(item.link, item.id)}>
              <ListItemIcon>
                {item.icon && (
                  <item.icon
                    sx={{
                      color: item.isSelected ? '#B3F2FF' : 'text.tertiary',
                      fontSize: '40px'
                    }}
                  />
                )}
              </ListItemIcon>
              {/* <ListItemText primary={item.title} sx={{ color: item.isSelected ? '#B3F2FF' : 'text.tertiary' }} /> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* </Paper> */}
    </Drawer>
  );
};

export default SideNavBar;

