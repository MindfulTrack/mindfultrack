'use client'
import {useState} from "react";
import {signOut, useSession} from "next-auth/react";
// import {Box, Button, Code, HStack, Spinner, Typography, VStack} from "@chakra-ui/react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import axios from "axios";

export default function Profile() {

  const {data: session, status} = useSession({required: true});
  const [response, setResponse] = useState("{}");

  const getUserDetails = async (useToken) => {
    try {
      const response = await axios({
        method: "get",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
        headers: useToken ? {Authorization: "Bearer " + session.access_token} : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error) {
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
      <Box m={8}>
          <Typography>PK: {session.user.pk}</Typography>
          <Typography>Username: {session.user.username}</Typography>
          <Typography>Email: {session.user.email || "Not provided"}</Typography>
          <Typography variant="code">
            {response}
          </Typography>
          <Button onClick={() => getUserDetails(true)}>
            User details (with token)
          </Button>
          <Button onClick={() => getUserDetails(false)}>
            User details (without token)
          </Button>
          <Button onClick={() => signOut({callbackUrl: "/"})}>
            Sign out
          </Button>
      </Box>
    );
  }

  return (<></>);
};