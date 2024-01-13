import Image from 'next/image'
import profilePic from './digitalpaper.jpg'
import DashCard from '@/components/DashCard'

export default function Notifications(){
    return <>
      <DashCard
        heading="TEST"
        text="THIS IS THE TEXT"
        imageSrc={profilePic}
      ></DashCard>
       
    </>
}