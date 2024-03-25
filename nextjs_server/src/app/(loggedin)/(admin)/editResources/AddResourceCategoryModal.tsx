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
  IconButton
} from "@mui/material";
import { ResourceDetailsViewModel } from "../../../../ts/types";
import customFetch from "../../../api/fetchInterceptor";
import { Upload, UploadFile } from "@mui/icons-material";
import AWS from 'aws-sdk';
import aws from "../../../api/sendAws";

interface AddResourceCategoryModalProps {
  open: boolean;
  handleClose: Function;
  handleReset: Function;
}

const AddResourceCategoryModal: React.FC<AddResourceCategoryModalProps> = ({
  open,
  handleClose,
  handleReset
}) => {

  const [newCategoryName, setNewCategoryName] = useState('');
  const [resourceImageName, setResourceImageName] = useState('');
  const [resourceImage, setResourceImage] = useState(null);

  
  
  const handleCancel = () => {
    handleClose()
  };
  
  const handleSubmit = async () => {
    if (resourceImage) {
      const response = aws(resourceImage);
      console.log(response)
    }

    const body = {
      "name": newCategoryName,
      "image": "https://mindfultrack-files.s3.us-east-2.amazonaws.com/images/" + resourceImageName
    };

    try {
      const request = await customFetch('base/resourceCategory/', 'POST', body);
      console.log(request);
    } catch (error) {
      console.log(error)
    };

    handleReset();
    handleClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNewCategoryName(newName);
  };

  const handleFileSelect = (event: any) => {
    setResourceImage(event.target.files[0]);
    setResourceImageName(event.target.files[0].name);
  };


  return (
    <Dialog open={open} onClose={handleCancel}>
      <Box sx={{ p: '15px', minWidth: '400px' }}>
        <Typography variant="body1" color='primary'>Add Resource Category</Typography>
        <DialogContent sx={{ backgroundColor: 'tertiary.main' }}>
          <Typography>Category Name:</Typography>
          <TextField sx={{ width: '100%' }} size="small" value={newCategoryName} onChange={handleTitleChange} />

          <Typography>Upload Image:</Typography>
          <input type="file" onChange={handleFileSelect} />
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

export default AddResourceCategoryModal;