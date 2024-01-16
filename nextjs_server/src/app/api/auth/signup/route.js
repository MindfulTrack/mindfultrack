import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request){
    try{
        const { email, password, password2, first_name, last_name } = await request.json();
        //VALIDATE HERE
        if(password != password2){

            console.log("PASSWORDS DON'T MATCH")
        }
        //ZOD??
        
        console.log({email, password})
        try {
        const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "auth/register/",
            method: "post",
            data:{
                username: email,
                password1: password,
                password2: password2,
                email: email,
                first_name: first_name,
                last_name: last_name
              }
        });
        const data = response.data;
        if (data) return data;
        } catch (error) {
        console.error(error);
        }
        return null;
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({message: "SUCCESS"})
}