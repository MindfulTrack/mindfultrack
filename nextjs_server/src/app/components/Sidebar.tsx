'use client'
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { PeopleAlt, Support, CalendarMonth, CrisisAlert, BarChart, AccountCircle, AppRegistration, Today, AdminPanelSettings } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Zoom, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { checkPermission } from '../../customFunctions/checkPermission';
import { Permissions } from '../../ts/constants';


interface SidebarItem {
  icon: string;
  title: string;
  link: string;
}

interface SideNavBarProps {
  userRole: string
};


const SideNavBar: React.FC<SideNavBarProps> = ({ userRole }) => {
  const router = useRouter();
  const pathname = usePathname();

  // TOP LEVEL ICONS
  const handleIconClick = (url: string, title: string) => {

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


    if (checkPermission([userRole]) === 1) {
      return ([
        {
          id: 1,
          icon: Support,
          title: "Resources",
          link: "/resources",
          isSelected: true
        },
        // {
        //   id: 2,
        //   icon: CalendarMonth,
        //   title: "Availability",
        //   link: "/availability",
        //   isSelected: false
        // },
        // {
        //   id: 3,
        //   icon: PeopleAlt,
        //   title: "Waitlist",
        //   link: "/waitlist",
        //   isSelected: false
        // },
        // {
        //   id: 5,
        //   icon: AccountCircle,
        //   title: "Profile",
        //   link: "/counselor",
        //   isSelected: false
        // },
        {
          id: 6,
          icon: BarChart,
          title: "Stats",
          link: "/dashboard",
          isSelected: false
        },
        {
          id: 7,
          icon: Today,
          title: "Schedule",
          link: "/schedule",
          isSelected: false
        },
        {
          id: 8,
          icon: AppRegistration,
          title: "Resource Management",
          link: "/editResources",
          isSelected: false
        },
        {
          id: 9,
          icon: AdminPanelSettings,
          title: "Admin Management",
          link: "djangoAdmin",
          isSelected: false
        },
        {
          id: 4,
          icon: CrisisAlert,
          title: "Crisis",
          link: "https://caps.byu.edu/for-students-in-crisis",
          isSelected: false
        }
      ])
    } else if (checkPermission([userRole]) === 2) {
      return ([
        {
          id: 1,
          icon: Support,
          title: "Resources",
          link: "/resources",
          isSelected: true
        },
        // {
        //   id: 5,
        //   icon: AccountCircle,
        //   title: "Profile",
        //   link: "/counselor",
        //   isSelected: false
        // },
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
        }
      ])
    } else if (checkPermission([userRole]) === 3) {
      return ([
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
        }
      ])
    } else {
      return ([

      ])
    }
  });


  // BOTTOM LEVEL ICONS
  const handleBottomIconClick = (url: string) => {

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
        link: '/logout',
        isSelected: false
      }
    ];
  });


  // OTHER FUNCTIONS
  useEffect(() => {
    const handlePathChange = () => {
      const path = pathname;
      const pathPortion: string[] = path.split("/");
      const finalPath: string = pathPortion.length > 1 ? `/${pathPortion[1]}` : "";
      const updatedBottomIcons = sidebarBottomItems.map((icon) => ({
        ...icon,
        isSelected: icon.link === finalPath
      }));

      // Set all isSelected to false in sidebarItems
      const updatedIcons = sidebarItems.map((icon) => ({
        ...icon,
        isSelected: icon.link === finalPath
      }));

      setSidebarBottomItems(updatedBottomIcons);
      setSidebarItems(updatedIcons);
    };

    handlePathChange();
  }, [pathname]);

  return (
    <Drawer
      sx={{
        width: '105px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '93px',
          boxSizing: 'border-box',
          top: ['48px', '56px', '64px'],
          height: 'auto',
          bottom: 0,
          backgroundColor: 'primary.main',
          paddingTop: '1rem',
          scrollbarWidth: 'none'
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ cursor: "pointer", paddingBottom: 1 }}>
            <ListItemButton onClick={() => handleIconClick(item.link, item.title)} sx={{ padding: 0 }}>
              <Tooltip
                title={item.title}
                disableFocusListener
                disableTouchListener
                TransitionComponent={Zoom}
                slotProps={{
                  popper: {
                    modifiers: [{
                      name: 'offset',
                      options: {
                        offset: item.title === 'Resource Management' ? [80, -50] : [50, -50]
                      }
                    }]
                  }
                }}
              >
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    {item.icon && (
                      <item.icon
                        sx={{
                          color: item.isSelected ? '#bfdfff' : 'text.tertiary',
                          fontSize: '30px'
                        }}
                      />)}
                  </Grid>
                  {/* {item.isSelected && (
                    <Grid item>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{ fontSize: '14px' }}
                        sx={{
                          color: '#bfdfff',
                          textAlign: 'center',
                          textWrap: 'wrap'
                        }}
                      />
                    </Grid>
                  )} */}
                </Grid>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>



      <Divider sx={{ mt: 'auto', backgroundColor: "tertiary.main" }} flexItem />

      <List>
        {sidebarBottomItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ cursor: "pointer", paddingBottom: 1 }}>
            <ListItemButton onClick={() => handleBottomIconClick(item.link)} sx={{ padding: 0 }}>
              <Tooltip
                title={item.title}
                disableFocusListener
                disableTouchListener
                TransitionComponent={Zoom}
                slotProps={{
                  popper: {
                    modifiers: [{
                      name: 'offset',
                      options: {
                        offset: [50, -50]
                      }
                    }]
                  }
                }}
              >
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    {item.icon && (
                      <item.icon
                        sx={{
                          color: item.isSelected ? '#bfdfff' : 'text.tertiary',
                          fontSize: '30px',
                        }}
                      />)}
                  </Grid>
                  {/* {item.isSelected && (
                    <Grid item>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{ fontSize: '14px' }}
                        sx={{
                          color: '#bfdfff',
                          textAlign: 'center',
                          textWrap: 'wrap'
                        }}
                      />
                    </Grid>
                  )} */}
                </Grid>
              </Tooltip>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* </Paper> */}
    </Drawer>
  );
};

export default SideNavBar;

