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

  const handleCancel = () => {
    handleClose()
  };

  const handleSubmit = async () => {
    const body = {
      "name": newCategoryName,
      "image": "https://picsum.photos/400/300"
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

  const handleDeleteClick = () => {

  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNewCategoryName(newName);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;

  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <Box sx={{ p: '15px', minWidth: '400px' }}>
        <Typography variant="body1" color='primary'>Add Resource Category</Typography>
        <DialogContent sx={{ backgroundColor: 'tertiary.main' }}>
          <Typography>Category Name:</Typography>
          <TextField sx={{width: '100%'}} size="small" value={newCategoryName} onChange={handleTitleChange}/>
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