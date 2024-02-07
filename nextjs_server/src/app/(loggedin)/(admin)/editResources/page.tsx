import { Typography, Paper, Box } from "@mui/material";
import React from "react";

interface ResourceManagementProps {

};

const ResourceManagement: React.FC<ResourceManagementProps> = () => {
    return (
        <Box>
        <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, marginTop: 2, marginBottom: 2, flex: '100%' }}>
          <Typography variant='h2' color='text.main' sx={{ textAlign: 'left' }}>
            Resource Management
          </Typography>
        </Paper>
      </Box>
    );
};

export default ResourceManagement;