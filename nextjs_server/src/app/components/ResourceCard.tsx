'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import MyContext from '../MyContext';
import { useContext } from 'react';
import { CardActionArea, CardMedia } from '@mui/material';

interface ResourceCardProps {
  name: string,
  id: number,
  image: string
}

const ResourceCard: React.FC<ResourceCardProps> = ({ name, id, image }) => {
  const { updateSelectedResourceId } = useContext(MyContext)!;

  const router = useRouter();
  const handleCategorySelect = (id: number) => {
    updateSelectedResourceId(id);
    router.push('resources/details');
  };

  return (
    <Card onClick={() => handleCategorySelect(id)} sx={{ cursor: "pointer" }} variant='outlined' style={{ backgroundColor: '#e6f4f1' }}>
      <CardActionArea>
        <CardMedia
          component={'img'}
          alt='random'
          image={image}
          object-fit='contain'
          height={150}
        />
        <CardContent>
          <Typography variant="h5" component="div" fontWeight={500} align='left'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ResourceCard;