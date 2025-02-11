
import { getSession } from "next-auth/react";

export const getUserSession= async()=>{
    const session= await getSession()

    return session;
}