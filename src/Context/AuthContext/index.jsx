import { createContext,useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import { jwtDecode } from 'jwt-decode'

import apiClient from '../../API/apiClient';

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(false)
   

    useEffect(()=>{
        setLoading(true)
        const token = localStorage.getItem('token-tickets')

        if(token){
            const decoded = jwtDecode(token)
            setUser(decoded)
        }else{
            setUser(null)
        }
        setLoading(false)
    },[])

    const login = async(email, password)=>{
        try {
            setLoading(true)
            const { data } = await apiClient.post('/auth/login',{email,password})
            if(data.success){
                const token = data.token
                localStorage.setItem('token-tickets',token)
                const decoded = jwtDecode(token)
                setUser(decoded)
                return { success:true, userRole: decoded.role}
            }else{
                
                setUser(null)
                localStorage.removeItem('token-tickets')
                logout()
                throw new Error("Credenciales incorrectas");
            }

        } catch (error) {
            throw new Error("Credenciales incorrectas",error);
            
        }finally{
            setLoading(false)
        }
    }

    const logout= ()=>{
        localStorage.removeItem('token-tickets')
        setUser(null)
        

    }

    return (
        <AuthContext.Provider value={{user,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)
export default AuthProvider;

