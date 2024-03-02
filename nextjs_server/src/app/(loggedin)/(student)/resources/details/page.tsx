'use client'
import React, { useContext, useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ResourceDetails from "./resource-details";
import MyContext from "../../../../MyContext";
import { ResourceViewModel, ResourceDetailsViewModel } from "../../../../../ts/types";
import customFetch from "../../../../api/fetchInterceptor";

interface ResourceSubPageProps {}

interface PanelProps {
  index: number;
  tabNum: number;
}



const ResourceSubPage: React.FC<ResourceSubPageProps> = () => {
  const { selectedResourceId, updateSelectedResourceId } = useContext(MyContext)!;
  const [resourceCategories, setResourceCategories] = useState<ResourceViewModel[]>([]);
  const [resourceDetails, setResourceDetails] = useState<ResourceDetailsViewModel[]>([]);
  const [favoriteResources, setFavoriteResources] = useState<ResourceDetailsViewModel[]>([]);
  // const [favoriteIdsList, setFavoriteIdsList] = useState<number[]>([]);
  const [value, setValue] = useState(selectedResourceId || 0);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await customFetch("base/resourceCategory");
        // Sort resources by id
        const sortedResources = resources.sort((a: any, b: any) => a.id - b.id);
        setResourceCategories(sortedResources);

        const resourceDetails = await customFetch('base/resourceDetails');
        setResourceDetails(resourceDetails);

        const fetchedFavorites = await customFetch('base/favoriteResources');
        setFavoriteResources(fetchedFavorites);

        const favoriteIDs: number[] = [];
        favoriteResources.map((resource: any) => {
          favoriteIDs.push(resource.id)
        });
        // setFavoriteIdsList(favoriteIDs);
        // console.log(favoriteIdsList)
      } catch (error) {
        console.error(error);
      }
    };

    // const getFavoriteIdList = () => {

    // };

    // getFavoriteIdList();
    fetchResources();
  }, []);

  function Panel(props: PanelProps) {
    const { tabNum, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={tabNum !== index}
        id={`panel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {tabNum === index && (
          <Box sx={{ p: 3 }}>
            <ResourceDetails 
              resourceId={selectedResourceId} 
              allResources={resourceDetails} 
              favoritedResources={favoriteResources} 
              // favoriteIdList={favoriteIdsList}
            />
          </Box>
        )}
      </div>
    );
  };



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
            {resourceCategories.map((resource) => (
              <Tab
                key={resource.id}
                label={resource.name}
              />
            ))}
          </Tabs>
        </Box>
        <Panel tabNum={value} index={value} />
      </Box>
    </>
  );
};

export default ResourceSubPage;
