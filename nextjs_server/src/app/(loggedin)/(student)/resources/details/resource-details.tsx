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
  resourceId: number
};

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId }) => {
  const { userId } = useContext(MyContext)!;

  // Fetch all resources
  const [resourceDetails, setResourceDetails] = useState<ResourceDetailsViewModel[]>([]);
  const [favoriteResources, setFavoriteResources] = useState([]);
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourceDetails = await customFetch('base/resourceDetails');
        setResourceDetails(resourceDetails);

        const fetchedFavorites = await customFetch('base/favoriteResources');
        // const filteredFavorites = fetchedFavorites.filter((row: any) => row.person === userId);

        // const finalFavorites = filteredFavorites
        // .filter((row: any) => row.resourceDetail === resourceDetails.id)
        // .map(item1 => ({
        //   ...item1,
        //   ...timeSlots.find(item2 => item2.timeSlotID === item1.timeSlotID)
        // }));
        console.log(fetchedFavorites);
        // setFavoriteResources(finalFavorites);
      } catch (error) {
        console.error(error)
      }
    };

    fetchResources();
  }, []);

  // Adding & Removing from favorites
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
        {favoriteResources
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
                  <Bookmark sx={{ fontSize: '35px', color:'#006141' }} />
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
        {resourceDetails
          .filter((item: any) => item.category === resourceId)
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
                  <Bookmark sx={{ fontSize: '35px', color: item.favorite ? '#006141' : '' }} />
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

