import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request){
    try{
        const { email, password, password2, first_name, last_name, username } = await request.json();
        //VALIDATE HERE
        // if(password != password2){

        //     console.log("PASSWORDS DON'T MATCH")
        // }
        //ZOD??
        
        console.log({email, password, password2, first_name, last_name, username})
        let data
        try {
            const response = await axios({
                url: process.env.NEXTAUTH_BACKEND_URL + "auth/register/",
                method: "post",
                data:{
                    username: username,
                    password1: password,
                    password2: password2,
                    email: email,
                    first_name: first_name,
                    last_name: last_name
                }
            });
            data = response.data;
            console.log(response.status)
            if(response.status !== 201 || response.status !== 200){
                return NextResponse.json({body: data}, { status: 500 })
            }
            else{
                return NextResponse.json({body: data}, { status: 200 })
            }
            // if (data) return data;
        } 
        catch (error) {
        console.error(error);
            data = error
        }
        return NextResponse.json({body: data}, { status: 500 })
        // return null;
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({body: "SUCCESS"})
}