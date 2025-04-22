import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";

export default function Login(){

  const [loginForm, setLoginForm] = useState({ email: "", password: ""});
  const [error,setError] = useState(false)
  const [messageError, setMessageError] = useState("");
  const [isAuthenticated,setIsAuthenticated] = useState(false)

  const navigator = useNavigate()

  const { login, user } = useAuth()

  const handleLogin = async() => {
    if(!loginForm.email || !loginForm.password){
      setError(true)
      setMessageError('Todos los campos deben ser llenados')
      return
    }
    try {
    await login(loginForm.email,loginForm.password)
    setIsAuthenticated(true)
    navigator('/gestion')
    
      
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
    {error && (<Alert severity="warning" onClose={() => setError(false)}>{messageError}</Alert>)}
    {isAuthenticated && (<Alert severity="success" onClose={() => setIsAuthenticated(false)}>Acceso correcto, Bienvenido {user.nombre}</Alert>)}
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Soporte Técnico Omegasys
          </h2>
        </div>
        <form className="mt-8 space-y-6" >
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Correo"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
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
                placeholder="Contraseña"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
          </div>
  
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a 
              className="decoration-none dark:text-gray-50"
              href={`${import.meta.env.VITE_APP_BASE_URL}/EmailResetPasswordForm`}>Olvide mi contraseña</a>
              
            </div>
          </div>
  
          
  
          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
    
  )
  
}