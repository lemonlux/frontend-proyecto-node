
import { createContext, useContext, useMemo, useState } from "react";


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) =>{
const [user, setUser] = useState(()  =>{

    const user = localStorage.getItem('user') 
return user ? JSON.parse(user) : null
})

const [allUser, setAllUser] = useState({
    data: {
        confirmationCode: '',
        user:{
            password: '',
            email: '',
        }
    }
})

const [deleteUser, setDeleteUser] = useState(false)


const bridgeData = (state) =>{
    const data = localStorage.getItem('data') //data va en string
    const parseData = JSON.parse(data)
    console.log(parseData)
    switch (state) {
        case 'registerOK':
            setAllUser(parseData)
            localStorage.removeItem('data')
            break;
    
        default:
            break;
    }
}


const login = (data) =>{   // la data se recibe aquí como STRING, si la recibieramos como PARSE hay que hacer JSON.stringify(data)
    console.log('entro al login')
    localStorage.setItem('user', data)
    const parseData = JSON.parse(data)
    setUser(parseData)

}

const logout = () =>{
    localStorage.removeItem('user')
    setUser(null)
}


const value = useMemo (()=>({
    user, setUser, login, logout, allUser, setAllUser, bridgeData, deleteUser, setDeleteUser
}), [user, allUser])



return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)