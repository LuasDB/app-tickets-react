import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './../Pages/Login'
import RestartPassword from './../Pages/RestartPassword'
import EmailResetPasswordForm from './../Pages/EmailResetPasswordForm'
import ThemeToggle from '../Components/ThemeToggle';
import './../index.css'
import AuthProvider from '../Context/AuthContext';
import Private from '../Components/Private';
import AdminLayout from '../Pages/AdminLayout';

function App() {

  return (
    <>
    <div className='flex flex-row-reverse p-1 fixed right-3 top-12'>
      <ThemeToggle />
    </div>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/s' element={<AdminLayout />}/>

        <Route path='/reset-password' element={<RestartPassword />}/>
        <Route path='/EmailResetPasswordForm' element={<EmailResetPasswordForm />}/>
        <Route path='/gestion' element={<Private><AdminLayout /></Private>} />

      </Routes>
    </BrowserRouter>
    </AuthProvider>
   
    </>
    
  )
}

export default App
