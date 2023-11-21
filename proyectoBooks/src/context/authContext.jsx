
import { createContext, useContext, useMemo, useState } from "react";


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) =>{
const [user, setUser] = useState(()  =>{

    const user = localStorage.getItem('user')
return user ? JSON.parse(user) : null
})


const login = (data) =>{   // la data se recibe aquí como STRING, si la recibieramos como PARSE hay que hacer JSON.stringify(data)
    localStorage.setItem('user', data)
    const parseData = JSON.parse(data)
    setUser(parseData)

}

const logout = () =>{
    localStorage.removeItem('user')
    setUser(null)
}


const value = useMemo (()=>({
    user, setUser, login, logout
}), [user])



return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)