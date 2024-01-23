'use client'
import React, { useContext } from "react";
import mockResources from '../mock-resources.json';
import { Box, Tabs, Tab } from "@mui/material";
import ResourceDetails from "./resource-details";
import MyContext from "../../../../MyContext";
import { Mystery_Quest } from "next/font/google";


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
          {children}
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

  // const [selectedResourceId, setSelectedResourceId] = React.useState(0);
  const handleTabClick = (id: number) => {
    // setSelectedResourceId(id);
    updateSelectedResourceId(id);
  }

  const { selectedResourceId, updateSelectedResourceId } = useContext(MyContext)!;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedResourceId - 1} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
            {mockData.resources.map((resource) => (
              <Tab label={resource.name} {...a11yProps(resource.id)} onClick={() => handleTabClick(resource.id)} />
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