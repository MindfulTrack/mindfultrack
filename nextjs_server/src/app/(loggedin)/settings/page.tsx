'use client'
import {useState} from "react";
import {signOut, useSession} from "next-auth/react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
interface SettingsProps {

};

const Settings: React.FC<SettingsProps> = () => {
    const {data: session, status} : any = useSession({required: true});
  const [response, setResponse] = useState("{}");
  const profileUrl = session?.picture;

  const getUserDetails = async (useToken : any) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXTAUTH_BACKEND_URL + "auth/user/",
        headers: useToken ? {Authorization: "Bearer " + session.access_token} : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error : any) {
      console.log("ERROR HERE")
      setResponse(error.message);
    }
    }


  if (status == "loading") {
    console.log("HERE")
    return <CircularProgress size="sm"/>;
  }

  if (session) {
    return (
    <Paper sx={{ backgroundColor: "#e6e6e6", padding: 2, margin: 2, flex: '100%' }}>
      <Box m={8}>
          <Avatar sx={{ width: 56, height: 56 }} alt={session.last_name} src={profileUrl} />
          <Typography>User ID: {session.user.pk}</Typography>
          <Typography>Name: {session.user.first_name} {session.user.last_name}</Typography>
          <Typography>Email: {session.user.email || "Not provided"}</Typography>
          <Typography>Username: {session.user.username}</Typography>
          <Typography>In Queue: {String(session.user.inQueue)}</Typography>
          <Typography>Permissions: {session.user.groups || "Not provided"}</Typography>
          {/* {response}
          <Button onClick={() => getUserDetails(true)}>
            User details (with token)
          </Button>
          <Button onClick={() => getUserDetails(false)}>
            User details (without token)
          </Button> */}
          <Button onClick={() => signOut({callbackUrl: "/"})}>
            Sign out
          </Button>
          <Button href="/password-reset">
              Reset password
          </Button>
      </Box>
    </Paper>
    );
  }

  return (<></>);
};

export default Settings;