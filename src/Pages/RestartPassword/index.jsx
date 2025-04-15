import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import apiClient from './../../API/apiClient'


export default function RestartPassword(){

  const [searchParams] = useSearchParams()
  const navigator = useNavigate()
  const [token,setToken] = useState(null)

  const [form,setForm] = useState({password:'', confirmPassword:''})
    
  const [error,setError] = useState(false)
  const [messageError,setMessageError] = useState('')
  const [sendPassword,setSendPassword] = useState(false)

  useEffect(()=>{
    setToken(searchParams.get('token'))
    console.log(searchParams.get('token'))

  },[])

  const handleSubmit = async()=>{
    if(!form.password || !form.confirmPassword){
      setError(true)
      setMessageError('Todos los campos deben ser llenados')
      return
    }
    if( form.password !== form.confirmPassword){
      setError(true)
      setMessageError('Las contraseñas deben coincidir')
      return
    }
    if(!token){
      setError(true)
      setMessageError('Error no se puede envíar tu respuesta')
      return
    }

    try {

      const { data } = await apiClient.post('/auth/reset-password',{newPassword:form.password, token})
      if(data.success){
        setSendPassword(true)
        setTimeout(() => {
          navigator('/login')
        }, 3000);

      }


    } catch (error) {
      setError(true)
      setMessageError(error)
      return
    }
    
    


  }

  return (
    <>
      {error && (<Alert severity="warning" onClose={() => setError(false)}>{messageError}</Alert>)}
      {sendPassword && (<Alert severity="success" >Contraseña reestablecida</Alert>)}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        
        <div className="max-w-md w-full p-6 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
              Restablecer contraseña
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
            
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nueva Contraseña"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Confirmar Contraseña"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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