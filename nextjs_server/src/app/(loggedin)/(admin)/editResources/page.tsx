'use client'
import { Typography, Paper, Box, Grid, Select, MenuItem, InputLabel, TextField, SelectChangeEvent, InputAdornment, Icon, Button, Card, CardMedia } from "@mui/material";
import React from "react";
import { ResourceDetailsViewModel, ResourceViewModel } from "../../../../ts/types";
import customFetch from "../../../api/fetchInterceptor";
import { useState, useEffect } from "react";
import ResourceMgmtCard from "./ResourceMgmtCard";
import { Edit, Save, Cancel } from "@mui/icons-material";
import EditResourceModal from "./EditResourceModal";
import AddResourceCategoryModal from "./AddResourceCategoryModal";
import aws from "../../../api/sendAws";

interface ResourceManagementProps {

};

const ResourceManagement: React.FC<ResourceManagementProps> = () => {
  const [resourceDetails, setResourceDetails] = useState<ResourceDetailsViewModel[]>([]);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [resourceCategories, setResourceCategories] = useState<ResourceViewModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [selectedCategoryImage, setSelectedCategoryImage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [tempCategoryName, setTempCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState(false);
  const [editResourceModalOpen, setEditResourceModalOpen] = useState(false);
  const [addCategoryModal, setAddCategoryModalOpen] = useState(false);
  const [resetData, setResetData] = useState(false);
  const [newResource, setNewResource] = useState(false);
  const [resourceImageName, setResourceImageName] = useState('');
  const [resourceImage, setResourceImage] = useState(null);
  const [resetImage, setResetImage] = useState(false);

  // Get all resources
  useEffect(() => {
    const fetchResourceDetails = async () => {
      try {
        const resourceCategories = await customFetch('base/resourceCategory');
        setResourceCategories(resourceCategories);

        const resourceDetails = await customFetch('base/resourceDetails');
        setResourceDetails(resourceDetails);
      } catch (error) {
        console.log(error)
      }
    };

    fetchResourceDetails();
  }, [resetData]);

  // Update name field value to selected category
  useEffect(() => {
    const selectedName = resourceCategories.filter((item) => item.id === parseInt(selectedCategory));
    if (selectedName.length === 1) {
      setCategoryName(selectedName[0].name);
      setSelectedCategoryImage(selectedName[0].image);
      setTempCategoryName(selectedName[0].name);
    };

    setResourceImage(null);

  }, [selectedCategory])

  const handleCategorySelect = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value as string);
    setEditCategoryName(false);
  };

  const handleResourceSelect = (id: number) => {
    if (id !== -1) {
      const data = resourceDetails.filter((item) => item.id === id);
      if (data.length === 1) {
        setSelectedResource(data[0])
      }
    } else {
      setNewResource(true);
      const data = {
        "id": resourceDetails.length + 1,
        "name": '',
        "description": '',
        "url": '',
        "category": parseInt(selectedCategory),
        "university": 1,
        "favoritedBy": []
      };
      setSelectedResource(data)
    }
    setEditResourceModalOpen(true);
  };

  const handleEditName = () => {
    setEditCategoryName(true);
  };

  const handleCancelEditName = () => {
    setCategoryName(tempCategoryName);
    setEditCategoryName(false);
  };

  const handleSaveEditName = async () => {
    try {
      const body = {
        "name": categoryName,
        "image": "https://picsum.photos/400/300"
      }
      const request = await customFetch(`base/resourceCategory/${selectedCategory}/`, 'PUT', body);
      console.log(request)
    } catch (error) {
      console.log(error);
    }

    setEditCategoryName(false);
    setSelectedCategory(selectedCategory);
    setTempCategoryName(categoryName);
    setResetData(!resetData);
  };

  const handleClose = () => {
    setEditResourceModalOpen(false);
    setAddCategoryModalOpen(false);
    setNewResource(false);
  };
  const handleReset = () => {
    setNewResource(false);
    setResetData(!resetData);
  }

  const handleAddCategoryClick = () => {
    setAddCategoryModalOpen(true);
  };

  const handleDeleteResourceCategory = async (id: string) => {

    const check = confirm("Are you sure you want to DELETE:  " + categoryName + "\n\nThis action cannot be undone.")

    if (check) {
      try {
        const request = await customFetch(`base/resourceCategory/${id}/`, 'DELETE');
        console.log(request);
      } catch (error) {
        console.log(error);
      }

      setSelectedCategory('');
      setResetData(!resetData);
    };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setCategoryName(newName);
  };

  const handleFileSelect = (event: any) => {
    setResourceImage(event.target.files[0]);
    setResourceImageName(event.target.files[0].name);
  };

  const handleSaveNewResourceImage = async () => {
    if (resourceImage) {
      aws(resourceImage).then(response => {
        const url = response;
        if (url) {
          setSelectedCategoryImage(url);
        }
      });
    };

    const body = {
      "name": categoryName,
      "image": "https://mindfultrack-files.s3.us-east-2.amazonaws.com/images/" + resourceImageName
    };

    try {
      const request = await customFetch(`base/resourceCategory/${selectedCategory}/`, 'PUT', body);
      console.log(request);
    } catch (error) {
      console.log(error)
    };

    setResetImage(!resetImage);

  };

  return (
    <Box>
      <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
          Resource Management
        </Typography>
        <Box sx={{ pt: '10px' }}>
          <Button variant="contained" color="primary" size="small" onClick={handleAddCategoryClick}>Add New Resource Category</Button>
        </Box>
      </Paper>

      {/* Category selection and deletion button */}
      <Grid container spacing={2}>
        <Grid item lg={5}>
          <Grid container spacing={2}>
            <Grid item lg={8}>
              <InputLabel sx={{ pb: '10px' }}>Select a Resource Category</InputLabel>
              <Select
                sx={{ width: '100%' }}
                color="primary"
                placeholder="Category"
                value={selectedCategory}
                onChange={handleCategorySelect}
              >
                <MenuItem value={0}>--Select--</MenuItem>
                {resourceCategories
                  .sort((a: any, b: any) => a.id - b.id)
                  .map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item lg={4}>
              {selectedCategory && selectedCategory !== '0' ?
                <Box sx={{ pt: 5, pl: 3 }}>
                  <Button variant="contained" color="warning" size="small" onClick={() => handleDeleteResourceCategory(selectedCategory)}>Delete {tempCategoryName} Category</Button>
                </Box>
                :
                <></>
              }
            </Grid>
          </Grid>
          {selectedCategory && selectedCategory !== '0' ?
            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between", pt: 4 }}>
              <Box sx={{ width: "100%" }}>
                <InputLabel sx={{ pb: '10px' }}>Edit Resource Name:</InputLabel>
                <TextField
                  disabled={editCategoryName ? false : true}
                  sx={{ width: '100%' }}
                  value={categoryName}
                  onChange={handleTitleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {!editCategoryName ?
                          <Icon sx={{ pr: 4, cursor: 'pointer' }} onClick={handleEditName}>
                            <Edit color="primary" />
                          </Icon>
                          :
                          <>
                            <Icon sx={{ pr: 4, cursor: 'pointer' }} onClick={handleSaveEditName}>
                              <Save color="primary" />
                            </Icon>
                            <Icon sx={{ pr: 4, cursor: 'pointer' }} onClick={handleCancelEditName}>
                              <Cancel color='error' />
                            </Icon>
                          </>
                        }
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </Box>
            :
            <></>
          }
        </Grid>
        {selectedCategory && selectedCategory !== '0' ?
          <Grid item lg={7}>
            <Grid container spacing={2}>
              <Grid item lg={7}>
                <Card sx={{ width: "80%", ml: '6rem', mt: 2 }}>
                  <CardMedia
                    component={"img"}
                    image={selectedCategoryImage}
                    height={"250px"}
                  />
                </Card>
              </Grid>
              <Grid item lg={5}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ pt: 1 }}>
                    <InputLabel>Edit Resource Image:</InputLabel>
                    <input type="file" onChange={handleFileSelect} />
                  </Box >
                  <Box sx={{ pt: 2 }}>
                    {resourceImage ?
                      <Button variant="contained" size="small" sx={{ pl: "30px", pr: "30px" }} color="primary" onClick={handleSaveNewResourceImage}>Save</Button>
                      :
                      <></>
                    }
                  </Box>
                </Box >
              </Grid>
            </Grid>
          </Grid>
          :
          <></>
        }
      </Grid>

      {/* Edit resource name and resources in the category */}
      {selectedCategory && selectedCategory !== '0' ?
        <Box >

          {resourceDetails.filter((item) => item.category == parseInt(selectedCategory)).length === 0 ?
            <Button variant="contained" size="small" sx={{ mt: 4 }} onClick={() => handleResourceSelect(-1)}>Add Resource</Button>
            :
            <Box sx={{ display: 'flex', flexDirection: 'row', pb: '15px' }}>
              <InputLabel sx={{ pb: '10px', pt: 4 }}>Select a resource to edit: </InputLabel>
              <Button variant="outlined" size="small" sx={{ mt: 4, ml: '15px' }} onClick={() => handleResourceSelect(-1)}>Add Resource</Button>
            </Box>
          }

          {resourceDetails
            .filter((item) => item.category == parseInt(selectedCategory))
            .sort((a: any, b: any) => a.id - b.id)
            .map((item) => {
              return (
                <Box key={item.id} onClick={() => handleResourceSelect(item.id)}>
                  <ResourceMgmtCard
                    name={item.name}
                    id={item.id}
                    description={item.description}
                  />
                </Box>
              )
            })}
        </Box>
        :
        <></>
      }

      {editResourceModalOpen && (
        <EditResourceModal
          open={editResourceModalOpen}
          handleClose={handleClose}
          handleReset={handleReset}
          selectedResource={selectedResource}
          newResource={newResource}
        />
      )}

      {addCategoryModal && (
        <AddResourceCategoryModal
          open={addCategoryModal}
          handleClose={handleClose}
          handleReset={handleReset}
        />
      )}
    </Box>
  );
};

export default ResourceManagement;