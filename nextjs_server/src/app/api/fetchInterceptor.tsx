import { getSession } from 'next-auth/react';
import { authOptions } from './auth/[...nextauth]/authOptions.js';
import { getServerSession } from "next-auth";


async function customFetch(url : any, methodType : any = 'GET', data : any = {}) {
  const op : any = authOptions;
  const session : any = await getServerSession(op);
  const token = session?.access_token;
  const baseUrl = process.env.NEXTAUTH_BACKEND_URL

  const customOptions = {
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
