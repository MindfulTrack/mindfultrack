import React from "react";
import { Container, Typography } from "@mui/material";
import mockResources from './mock-resource-details.json';

interface ResourceDetailsProps {
  resourceId: number
};

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId }) => {
  const mockData = mockResources;

  return (
    <>
      {mockData.resourceDetails
        .filter((item) => item.resourceCategoryId === resourceId)
        .map((item) => (
          <Container sx={{ marginBottom: 2, marginLeft: 0 }} disableGutters>
            <Typography variant='h3' color="text.primary" fontWeight={'700'} sx={{ textAlign: "left" }}>{item.name}</Typography>
            <Typography variant='body1' color="text.primary" fontWeight={'700'} sx={{ textAlign: "left" }}>{item.description}</Typography>
          </Container>
        ))}
    </>
  )
};

export default ResourceDetails;

