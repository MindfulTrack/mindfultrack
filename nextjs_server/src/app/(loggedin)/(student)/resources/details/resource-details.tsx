'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Star, OpenInNew } from '@mui/icons-material';
import { useContext } from 'react';
import customFetch from '../../../../api/fetchInterceptor';
import { ResourceDetailsViewModel } from '../../../../../ts/types';
import MyContext from '../../../../MyContext';

interface ResourceDetailsProps {
  resourceId: number;
  allResources: ResourceDetailsViewModel[];
  favoritedResources: ResourceDetailsViewModel[];
  favoriteIdsList: number[];
  handleReset: Function;
};

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId, allResources, favoritedResources, favoriteIdsList, handleReset }) => {

  const { userId } = useContext(MyContext)!;

  const handleAddRemoveSaved = async (id: number) => {
    const clickedResource = allResources.filter((item) => item.id === id);
    const favoritedByArray = clickedResource[0].favoritedBy;

    const testArray = favoritedByArray.filter(num => num === userId)
    if (testArray.length === 1) {
      const updatedFavorites = favoritedByArray.filter(num => num !== userId);
      try {
        const body = {
          "name": clickedResource[0].name,
          "description": clickedResource[0].description,
          "url": clickedResource[0].url,
          "category": clickedResource[0].category,
          "university": clickedResource[0].university,
          "favoritedBy": updatedFavorites
        };
        const request = await customFetch(`base/resourceDetails/${id}/`, 'PUT', body);
        console.log(request);
      } catch (error) {
        console.log(error);
      };
    } else {
      const updatedFavorites = [...favoritedByArray, userId]
      try {
        const body = {
          "name": clickedResource[0].name,
          "description": clickedResource[0].description,
          "url": clickedResource[0].url,
          "category": clickedResource[0].category,
          "university": clickedResource[0].university,
          "favoritedBy": updatedFavorites
        };
        const request = await customFetch(`base/resourceDetails/${id}/`, 'PUT', body);
        console.log(request);
      } catch (error) {
        console.log(error);
      };
    }


    handleReset();
    // handleClose();
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
                  <Star sx={{ fontSize: '35px', color: 'info.main' }} />
                </IconButton>
                <IconButton aria-label="share" href={item.url} target='_blank'>
                  <OpenInNew sx={{ color: '#666666', fontSize: '18px' }} />
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
                  <Star sx={{ fontSize: '35px', color: favoriteIdsList.includes(item.id) ? 'info.main' : '' }} />
                </IconButton>
                <IconButton aria-label="share" href={item.url} target='_blank'>
                  <OpenInNew sx={{ color: '#666666', fontSize: '18px' }} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </>
    )

  );
};

export default ResourceDetails;

