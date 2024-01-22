import React from 'react';
import profilePic from './digitalpaper.jpg'
import DashCard from '../../../../components/DashCard';

interface NotificationsProps {

};

const Notifications: React.FC<NotificationsProps> = () => {
    return <>
      <DashCard
        heading="TEST"
        text="THIS IS THE TEXT"
        imageSrc={profilePic}
      ></DashCard>
       
    </>
};

export default Notifications;