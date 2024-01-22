'use client'
import * as React from 'react';
import Image from "next/legacy/image";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import MyContext from '../MyContext';
import { useContext } from 'react';

interface ResourceCardProps {
  displayName: string,
  description: string,
  name: string,
  image: string,
  id: number
}

const ResourceCard: React.FC<ResourceCardProps> = ({ displayName, name, image, id, description }) => {
  const { selectedResourceId, updateSelectedResourceId } = useContext(MyContext)!;

  const router = useRouter();
  const handleCategorySelect = (id: number) => {
    updateSelectedResourceId(id);
    router.push('resources/details');
  };

  return (
    <Card onClick={() => handleCategorySelect(id)} sx={{ cursor: "pointer" }}>
      {/* <Image
        alt="Random image"
        src={image}
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {displayName}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small" onClick={() => handleCategorySelect(id)}>Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default ResourceCard;