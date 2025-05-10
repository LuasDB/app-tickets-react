import { createContext,useState,useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import socket from '@/API/socket';


import { jwtDecode } from 'jwt-decode'

import apiClient from '../../API/apiClient';
import newStyled from '@emotion/styled';

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

        socket.on('new_ticket',(newTicket)=>{
            console.log('Nuevos datos de un ticket desde el servidor',newTicket)
            
        })
        return ()=>{
            socket.off('new_ticket')
        }
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

    const updateServiceTime = (serviceTime)=>{
        setUser((prev)=>{
            return {...prev,serviceTime}
        })
    }

    return (
        <AuthContext.Provider value={{user,loading,login,logout,updateServiceTime}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)
export default AuthProvider;

