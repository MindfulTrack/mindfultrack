import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request){
    try{
        const { email } = await request.json();
        //VALIDATE HERE
        // if(password != password2){

        //     console.log("PASSWORDS DON'T MATCH")
        // }
        //ZOD??
        
        let data
        try {
            const response = await axios({
                url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/password/reset/",
                method: "post",
                data:{
                    email: email,
                }
            });
            data = response.data;

            if(response.status != 201 && response.status != 200){
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