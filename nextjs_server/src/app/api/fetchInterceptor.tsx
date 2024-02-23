'use server'
import { getSession } from 'next-auth/react';
import { authOptions } from './auth/[...nextauth]/authOptions.js';
import { getServerSession } from "next-auth";


export default async function customFetch(url : any, options : any = {}) {
  const op : any = authOptions;
  const session : any = await getServerSession(op);
  const token = session?.access_token;
  const baseUrl = process.env.NEXTAUTH_BACKEND_URL

  const customOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  const data = fetch(baseUrl + url, customOptions)
  return (await data).json();
};
