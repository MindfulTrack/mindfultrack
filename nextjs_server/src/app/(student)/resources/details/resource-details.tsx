import React from "react";
import { Container, Typography } from "@mui/material";
import mockResources from '../mock-resources.json';
import { useParams } from "next/navigation";

interface ResourceDetailsProps {
    resourceId: number
};

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId }) => {
    const mockData = mockResources;
    // const resource = useParams();

    return (
        <>
            {mockData.resources
            .filter((item) => item.id === resourceId)
            .map((item) => (
                <Container sx={{ marginBottom: 2, marginLeft: 0}} disableGutters>
                    <Typography variant='h3' color="text.primary" fontWeight={'700'} sx={{textAlign: "left"}}>{item.displayName}</Typography>
                </Container>
            ))}
        </>
    )
};

export default ResourceDetails;

