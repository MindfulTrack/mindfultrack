'use client'
import React from "react";
import mockResources from '../../resources/mock-resources.json';
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

interface ResourceSubPageProps {

};

const ResourceSubPage: React.FC<ResourceSubPageProps> = () => {
    const mockData = mockResources;
    const resourceId = useParams();
    console.log(resourceId);
    // console.log(params);

    const filtered = mockData.resources.filter((item) => item.id === Number(resourceId));
    console.log(filtered);

    return (
        <>
        <Typography>Testing</Typography>
        {mockData.resources
            .filter((item) => item.id === Number(resourceId.value))
            .map((thing) => (
                <Typography variant="body1" color="primary">This is resource {thing.category}</Typography>
            ))}
        </>
    )
};

export default ResourceSubPage;