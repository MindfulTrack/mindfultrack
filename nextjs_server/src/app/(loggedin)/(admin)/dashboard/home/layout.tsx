import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  notifications: any;
  stats:any;
  other:any;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children, notifications, stats, other}) => {
    return <section><div>
    <div>{children}</div>
    <div>{notifications}</div>
    <div>{stats}</div>
    <div>{other}</div> 
  </div></section>
};

export default DashboardLayout;
