'use client'
import React from "react";
import mockResources from '../mock-resources.json';
import { Typography, Container, Box, Tabs, Tab } from "@mui/material";
import ResourceDetails from "./resource-details";


interface ResourceSubPageProps {

};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
};
  
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const ResourceSubPage: React.FC<ResourceSubPageProps> = () => {
    const mockData = mockResources;

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const [selectedResourceId, setSelectedResourceId] = React.useState(0);
    const handleTabClick = (id: number) => {
      setSelectedResourceId(id);
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" scrollButtons={true} allowScrollButtonsMobile>
                        {mockData.resources.map((resource) => (
                            <Tab label={resource.displayName} {...a11yProps(0)} onClick={() => handleTabClick(resource.id)}/>
                        ))}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={value}>
                    <ResourceDetails resourceId={selectedResourceId} />
                </CustomTabPanel>
            </Box>
        </>
    )
};

export default ResourceSubPage;