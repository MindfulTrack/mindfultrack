'use client'
import React, { useContext, useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ResourceDetails from "./resource-details";
import MyContext from "../../../../MyContext";
import { ResourceViewModel, ResourceDetailsViewModel } from "../../../../../ts/types";
import customFetch from "../../../../api/fetchInterceptor";

interface ResourceSubPageProps { }

interface PanelProps {
  index: number;
  tabIndex: number;
}



const ResourceSubPage: React.FC<ResourceSubPageProps> = () => {
  const { selectedResourceId, updateSelectedResourceId } = useContext(MyContext)!;
  const [resourceCategories, setResourceCategories] = useState<ResourceViewModel[]>([]);
  const [resourceDetails, setResourceDetails] = useState<ResourceDetailsViewModel[]>([]);
  const [favoriteResources, setFavoriteResources] = useState<ResourceDetailsViewModel[]>([]);
  const [favoriteIdsList, setFavoriteIdsList] = useState<number[]>([]);
  const [value, setValue] = useState(selectedResourceId || 0);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await customFetch("base/resourceCategory");
        // Sort resources by id
        const sortedResources = resources.sort((a: any, b: any) => a.id - b.id);
        setResourceCategories(sortedResources);

        // Set Correct Tab
        const index = getIndexById(sortedResources, selectedResourceId);
        setValue(index + 1);

        // Get all Resources
        const resourceDetails = await customFetch('base/resourceDetails');
        setResourceDetails(resourceDetails);

        // Get favorites
        const fetchedFavorites = await customFetch('base/favoriteResources');
        setFavoriteResources(fetchedFavorites);

        let IdArray: any = [];
        IdArray = fetchedFavorites.forEach((element: any) => {
          // IdArray = [...IdArray, element.id]
          // setFavoriteIdsList(IdArray);
          console.log(element.id)
        });

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
    const { tabIndex, index } = props;

    return (
      <div
        role="tabpanel"
        hidden={tabIndex !== index}
        id={`panel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {tabIndex === index && (
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

  function getIndexById(array: ResourceViewModel[], targetId: number) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === targetId) {
        return i; // Found the index of the element with the target ID
      }
    }
    return -1; // ID not found in the array
  };

  const handleChange = (event: any, newValue: number) => {
    console.log("hi", newValue)
    setValue(newValue);
  };

  const handleChangeCustom = (newValue: number) => {
    // console.log(newValue);
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
            <Tab key={0} label="Favorites" onClick={() => handleChangeCustom(0)} />
            {resourceCategories.map((resource) => (
              <Tab
                key={resource.id}
                label={resource.name}
                onClick={() => handleChangeCustom(resource.id)}
              />
            ))}
          </Tabs>
        </Box>
        <Panel tabIndex={value} index={value} />
      </Box>
    </>
  );
};

export default ResourceSubPage;
