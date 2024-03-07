'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardHeader, CardContent } from '@mui/material';

interface ResourceMgmtCardProps {
  name: string,
  id: number,
  description: string
}

const ResourceMgmtCard: React.FC<ResourceMgmtCardProps> = ({ name, id, description }) => {

  return (
    <Card key={id} sx={{ maxWidth: "100%", marginBottom: 2, backgroundColor: '#fafcff', cursor: 'pointer' }}>
      <CardHeader
        title={name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResourceMgmtCard;