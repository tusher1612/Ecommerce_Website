"us client"

import { useSession } from "next-auth/react"
export const getSession=()=>{
    const {data:session}=useSession()

    return session;
}