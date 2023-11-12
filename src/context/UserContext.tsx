"use client"

import { createContext, useState } from "react"

let User = {
    username: "",
    autorizado: false
}

export const UserContext = createContext (User)

export function UserProvider({children}: {children: React.ReactNode}){

    const [user, setUser] = useState(User)

    return(
        //@ts-ignore
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}