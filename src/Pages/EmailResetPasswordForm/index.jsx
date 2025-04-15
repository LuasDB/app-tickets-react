import { useState } from "react"
import { useNavigate } from "react-router-dom";

import Alert from '@mui/material/Alert';
import apiClient from './../../API/apiClient'

export default function EmailResetPasswordForm(){

    const [form,setForm] = useState({email:''})
    const [error,setError] = useState(false)
    const [messageError,setMessageError] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    const navigator = useNavigate()

    const handleSubmit = async()=>{
        if(!form.email){
            setError(true)
            setMessageError('Debes ingresar un correo valido')
            return
        }
        try {
            const { data } = await apiClient.post('auth/forgot-password',{email:form.email})
            if(data.success){
                setEmailSent(true)
                setError(false)
                setTimeout(() => {
                    navigator('/login')
                }, 4000);
            }
        } catch (error) {
            console.error(error)

            setError(true)
            if(error.response && error.response.data && error.response.data.message){
                setMessageError(error.response.data.message)
            }else{
                setMessageError('Ocurrió un error al procesar tu solicitud. Intenta de nuevo más tarde.');
            }
            
        }

    }
    return (
        <>
            { error && (<Alert severity='warning' onClose={()=>setError(false)}>{messageError}</Alert>)}
            { emailSent && (<Alert severity="success" >Enviado. Revisa tu correo para restablecer tu contraseña</Alert>)}
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            
            <div className="max-w-md w-full p-6 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div>
                <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
                Ingresa tu correo para cambiar contraseña
                </h2>
            </div>
            <form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm space-y-4">
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Correo registrado
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Correo"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                
                </div>
        
            
        
                
                <div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        
                >
                    Enviar
                </button>
                </div>
            </form>
            </div>
            </div>
        </>
       
    )

}