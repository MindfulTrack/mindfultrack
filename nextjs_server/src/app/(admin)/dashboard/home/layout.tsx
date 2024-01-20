import React from "react";

interface DashboardLayoutProps {
  props: any
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({props}) => {
    return <section><div>
    <div>{props.children}</div>
    <div>{props.notifications}</div>
    <div>{props.stats}</div>
    <div>{props.other}</div> 
  </div></section>
};

export default DashboardLayout;
