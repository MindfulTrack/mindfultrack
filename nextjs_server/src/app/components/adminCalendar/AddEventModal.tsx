import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState} from "react"
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Autocomplete,
  Box,
} from "@mui/material"

interface AddEventModalProps {
    open: boolean;
    handleClose: Function;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}
  
  const AddEventModal: React.FC<AddEventModalProps> = ({ open, handleClose, onChange, value }) => {
    const [eventTitle, setEventTitle] = useState("");
  
    const onClose = () => handleClose()

    // const onChange = () => {
    //     setEventTitle()
    // }

  
    return (
      <Dialog open={open} onClose={onClose} >
        <DialogTitle sx={{backgroundColor: 'tertiary.main'}}>Edit Event</DialogTitle>
        <DialogContent sx={{backgroundColor: 'tertiary.main'}}>
          <DialogContentText>To add a event, please fill in the information below.</DialogContentText>
          <Box component="form" >
            <TextField
              name="description"
              value={value}
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              onChange={onChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'tertiary.main'}}>
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button color="success">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  
  export default AddEventModal