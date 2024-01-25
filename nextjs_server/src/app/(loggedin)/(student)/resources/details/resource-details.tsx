import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Bookmark from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import mockResources from './mock-resource-details.json';
import { useState } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface ResourceDetailsProps {
  resourceId: number
};

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resourceId }) => {

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
        {mockData.resourceDetails
          .filter((item) => item.favorite === true)
          .map((item) => (
            <Card sx={{ maxWidth: "100%", marginBottom: 2, backgroundColor: '#fafcff' }}>
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
                  <Bookmark sx={{ fontSize: '35px', color: item.favorite ? '#006141' : '' }} />
                </IconButton>
                <IconButton aria-label="share" href={item.URL} target='_blank'>
                  <OpenInNewIcon sx={{ color: '#666666', fontSize: '18px' }} />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </>
    ) : (
      <>
        {mockData.resourceDetails
          .filter((item) => item.resourceCategoryId === resourceId)
          .map((item) => (
            <Card sx={{ maxWidth: "100%", marginBottom: 2, backgroundColor: '#fafcff' }}>
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
                  <Bookmark sx={{ fontSize: '35px', color: item.favorite ? '#006141' : '' }} />
                </IconButton>
                <IconButton aria-label="share" href={item.URL} target='_blank'>
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

