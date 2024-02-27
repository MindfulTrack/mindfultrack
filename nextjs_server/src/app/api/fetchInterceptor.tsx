'use server'
import { authOptions } from './auth/[...nextauth]/authOptions.js';
import { getServerSession } from "next-auth";
import {errorCodes} from '../api/errorCodes';


export default async function customFetch(url : any, methodType : any = 'GET', body : any = null, customOption : any = null) {
  const op : any = authOptions;
  const session : any = await getServerSession(op);
  const token = session?.access_token;
  const baseUrl = process.env.NEXTAUTH_BACKEND_URL

  // if custom options specified then use custome options
  let customOptions = customOption ? customOption : {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if(body){
    customOptions['body'] =JSON.stringify(body)
  }
  const data = await fetch(baseUrl + url, customOptions);

  if (!data.ok) {
    const statusCode : any = errorCodes
    throw new Error(`${statusCode[data.status]}`);
  }
  return (data).json();
}

