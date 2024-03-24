'use client'
import React, { useEffect, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Box,
  InputLabel,
  IconButton
} from "@mui/material";
import { ResourceDetailsViewModel } from "../../../../ts/types";
import customFetch from "../../../api/fetchInterceptor";
import { Delete } from "@mui/icons-material";

interface AddEventModalProps {
  open: boolean;
  handleClose: Function;
  handleReset: Function;
  newResource: boolean;
  selectedResource: ResourceDetailsViewModel | undefined;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  handleClose,
  selectedResource,
  handleReset,
  newResource
}) => {

  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceDescription, setNewResourceDescription] = useState('');
  const [newResourceURL, setNewResourceURL] = useState('');

  useEffect(() => {
    if (selectedResource) {
      setNewResourceName(selectedResource.name);
      setNewResourceDescription(selectedResource.description);
      setNewResourceURL(selectedResource.url)
    };

  }, [])

  const handleCancel = () => {
    handleClose()
  };

  const handleSubmit = async () => {
    try {
      const body = {
        "name": newResourceName,
        "description": newResourceDescription,
        "url": newResourceURL,
        "category": selectedResource?.category,
        "university": selectedResource?.university,
        // "favoritedBy": selectedResource?.favoritedBy === undefined ? [] : selectedResource?.favoritedBy
      };
      if (newResource) {
        const request = await customFetch('base/resourceDetails/', 'POST', body);
        console.log(request);
      } else {
        const request = await customFetch(`base/resourceDetails/${selectedResource?.id}/`, 'PUT', body);
        console.log(request);
      }
    } catch (error) {
      console.log(error);
    };

    handleReset();
    handleClose();
  };

  const handleDeleteClick = async () => {
    const check = confirm("Are you sure you want to DELETE this resource:  " + selectedResource?.name + "\n\nThis action cannot be undone.");

    if (check) {
      try {
        const request = await customFetch(`base/resourceDetails/${selectedResource?.id}/`, 'DELETE');
        console.log(request);
      } catch (error) {
        console.log(error);
      };
  
      handleReset();
      handleClose();
    };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNewResourceName(newName);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setNewResourceDescription(newDescription);
  };
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newURL = e.target.value;
    setNewResourceURL(newURL);
  };


  return (
    <Dialog open={open} onClose={handleCancel}>
      <Box sx={{ minWidth: '600px', padding: '15px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <InputLabel>{newResource ? "Add" : "Edit"} Resource</InputLabel>
          {!newResource ?
            <IconButton>
              <Delete onClick={handleDeleteClick} sx={{ cursor: 'pointer' }} />
            </IconButton>
            :
            <></>
          }
        </Box>
        <DialogContent sx={{ backgroundColor: 'tertiary.main' }}>
          <Typography>Name:</Typography>
          <TextField sx={{ width: '100%' }} size="small" value={newResourceName} onChange={handleTitleChange} />
          <Typography>Description:</Typography>
          <TextField sx={{ width: '100%' }} size="small" value={newResourceDescription} onChange={handleDescriptionChange} />
          <Typography>URL:</Typography>
          <TextField sx={{ width: '100%' }} size="small" value={newResourceURL} onChange={handleURLChange} />
        </DialogContent>

        <DialogActions sx={{ backgroundColor: 'tertiary.main' }}>
          <Button color="error" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
};

export default AddEventModal;