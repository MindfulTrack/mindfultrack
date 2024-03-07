'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Bookmark from '@mui/icons-material/Bookmark';
import mockResources from './mock-resource-details.json';
import { useState, useEffect, useContext } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import customFetch from '../../../../api/fetchInterceptor';
import { ResourceDetailsViewModel } from '../../../../../ts/types';
import MyContext from '../../../../MyContext';

interface ResourceDetailsProps {
  resourceId: number;
  allResources: ResourceDetailsViewModel[];
  favoritedResources: ResourceDetailsViewModel[];
};

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId, allResources, favoritedResources }) => {

  // Adding & Removing from favorites ||| Moving this to main resourceDetail page
  const [mockData, setMockData] = useState(mockResources);
  const handleAddRemoveSaved = (id: number) => {
    const updateSaved = mockData.resourceDetails.map((resource) => ({
      ...resource,
      favorite: resource.id === id ? !resource.favorite : resource.favorite
    }));

    setMockData({ ...mockData, resourceDetails: updateSaved });
  };

  return (
    resourceId === 0 ? (
      <>
        {favoritedResources
          .sort((a: any, b: any) => a.id - b.id)
          .map((item: any) => (
            <Card key={item.id} sx={{ maxWidth: "100%", marginBottom: 2, backgroundColor: '#fafcff' }}>
              <CardHeader
                title={item.name}
              // subheader="September 14, 2016"
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handleAddRemoveSaved(item.id)}>
                  <Bookmark sx={{ fontSize: '35px', color: '#006141' }} />
                </IconButton>
                <IconButton aria-label="share" href={item.url} target='_blank'>
                  <OpenInNewIcon sx={{ color: '#666666', fontSize: '18px' }} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </>
    ) : (
      <>
        {allResources
          .filter((item: any) => item.category === resourceId)
          .sort((a: any, b: any) => a.id - b.id)
          .map((item: any) => (
            <Card key={item.id} sx={{ maxWidth: "100%", marginBottom: 2, backgroundColor: '#fafcff' }}>
              <CardHeader
                title={item.name}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => handleAddRemoveSaved(item.id)}>
                  <Bookmark sx={{ fontSize: '35px', color: favoritedResources.includes(item.id) ? '#006141' : '' }} />
                </IconButton>
                <IconButton aria-label="share" href={item.url} target='_blank'>
                  <OpenInNewIcon sx={{ color: '#666666', fontSize: '18px' }} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </>
    )

  );
};

export default ResourceDetails;

