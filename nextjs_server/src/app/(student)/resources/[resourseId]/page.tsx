'use client'
import React from "react";
import mockResources from '../../resources/mock-resources.json';
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function Resource() {
    const mockData = mockResources;
    const resourceId = useParams();
    console.log(resourceId);
    // console.log(params);

    const filtered = mockData.resources.filter((item) => item.id === resourceId);
    console.log(filtered);

    return (
        <>
        <Typography>Testing</Typography>
        {mockData.resources
            .filter((item) => item.id === resourceId)
            .map((thing) => (
                <Typography variant="body1" color="primary">This is resource {thing.category}</Typography>
            ))}
        </>
    )
}