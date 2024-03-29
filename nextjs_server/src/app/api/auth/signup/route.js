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
            console.log("URL: \n\n\n\n\n\n")
            console.log(process.env.NEXTAUTH_BACKEND_URL + "auth/register/")
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
            console.log(response.data)
            if(response.status !== 201 && response.status !== 200){
                // return {'error': error.response.data.non_field_errors[0]}
                return NextResponse.json({error: error.response.data.non_field_errors[0]}, { status: 500 })
            }
            else{
                return NextResponse.json({body: data}, { status: 200 })
            }
        } 
        catch (error) {
            console.error(error);
            console.log(error.response.data)
            return NextResponse.json({error: error.response.data}, { status: 500 })

        }
        // return NextResponse.json({body: data}, { status: 500 })
        // return null;
    }
    catch(e){
        console.log({e})
    }

    return NextResponse.json({body: "SUCCESS"})
}