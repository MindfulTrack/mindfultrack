'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface AdminDjangoPageProps {

};

const AdminDjangoPage: React.FC<AdminDjangoPageProps> = async () => {
  const pathname = usePathname();
  useEffect(() => {
    const iframe = document.getElementById('django-admin-iframe');

    const handleIframeLoad = () => {
      console.log('Iframe is fully loaded');
      // You can perform additional actions here
      if (pathname.includes('/404')) {
        // Reload the whole page
        window.location.reload();
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  return (
      <Box display="inline-block" width="100%" height="600px" overflow="hidden" borderRadius="10px" style={{marginTop: "14px", marginBottom:"50px"}}>
        <iframe
          id="django-admin-iframe"
          src="https://mindfultrack.org:8000/admin/"
          title="Django Admin"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </Box>
  );
};

export default AdminDjangoPage;