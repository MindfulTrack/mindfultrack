
export default function DashboardLayout(props) {
    return <section><div>
    <div>{props.children}</div>
    <div>{props.notifications}</div>
    <div>{props.stats}</div>
    <div>{props.other}</div> 
  </div></section>
  }
