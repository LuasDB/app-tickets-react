import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './../Pages/Login'
import RestartPassword from './../Pages/RestartPassword'
import EmailResetPasswordForm from './../Pages/EmailResetPasswordForm'
import ThemeToggle from '../Components/ThemeToggle';
import './../index.css'
import AuthProvider from '../Context/AuthContext';

function App() {

  return (
    <>
    <div className='bg-gray-50 dark:bg-gray-900 flex flex-row-reverse p-1 fixed right-3 top-12'>
      <ThemeToggle />
    </div>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/reset-password' element={<RestartPassword />}/>
        <Route path='/EmailResetPasswordForm' element={<EmailResetPasswordForm />}/>
      </Routes>
    </BrowserRouter>

    </AuthProvider>
   
    </>
    
  )
}

export default App
