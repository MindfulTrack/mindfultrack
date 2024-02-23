import { getSession } from 'next-auth/react';
import { authOptions } from './auth/[...nextauth]/authOptions.js';
import { getServerSession } from "next-auth";


async function customFetch(url : any, methodType : any = 'GET', data : any = {}, customOption : any = null) {
  const op : any = authOptions;
  const session : any = await getServerSession(op);
  const token = session?.access_token;
  const baseUrl = process.env.NEXTAUTH_BACKEND_URL

  // if custom options specified then use custome options
  const customOptions = customOption ? customOption : {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(data),
  };

  return fetch(baseUrl + url, customOptions);
}

export default customFetch;
