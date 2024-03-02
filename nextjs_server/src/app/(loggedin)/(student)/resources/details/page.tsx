'use client'
import React, { useContext, useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ResourceDetails from "./resource-details";
import MyContext from "../../../../MyContext";
import { ResourceViewModel } from "../../../../../ts/types";
import customFetch from "../../../../api/fetchInterceptor";

interface ResourceSubPageProps {}

interface PanelProps {
  index: number;
  value: number;
}



const ResourceSubPage: React.FC<ResourceSubPageProps> = () => {
  const { selectedResourceId, updateSelectedResourceId } = useContext(MyContext)!;
  const [resources, setResources] = useState<ResourceViewModel[]>([]);
  const [value, setValue] = useState(selectedResourceId || 0);

  function Panel(props: PanelProps) {
    const { value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`panel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <ResourceDetails resourceId={selectedResourceId} />
          </Box>
        )}
      </div>
    );
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await customFetch("base/resourceCategory");
        // Sort resources by id
        const sortedResources = resources.sort((a: any, b: any) => a.id - b.id);
        setResources(sortedResources);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
    updateSelectedResourceId(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab key={0} label="Favorites" />
            {resources.map((resource) => (
              <Tab
                key={resource.id}
                label={resource.name}
              />
            ))}
          </Tabs>
        </Box>
        <Panel value={value} index={value} />
      </Box>
    </>
  );
};

export default ResourceSubPage;
