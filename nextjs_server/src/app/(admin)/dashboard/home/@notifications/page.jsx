import profilePic from './digitalpaper.jpg'
import DashCard from '@/app/components/DashCard'

export default function Notifications(){
    return <>
      <DashCard
        heading="TEST"
        text="THIS IS THE TEXT"
        imageSrc={profilePic}
      ></DashCard>
       
    </>
}