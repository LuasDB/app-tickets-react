import { useNavigate } from "react-router-dom";
import Card from "../Card";
import Col from "./../Col"
import { CiLogout } from "react-icons/ci";
import { useAuth } from './../../Context/AuthContext'
import { useEffect } from "react";
import  logo  from './../../assets/logo_omegasys.png'

export default function MenuBar() {
  const { user, logout} = useAuth()
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
    navigate('/login')

    }
  },[])
  const handleLogout = ()=>{
    logout()
    navigate('/login')

  }

  return (
    
<Card className="p-2 w-[100%]">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo de la empresa"
            className="w-20 h-5 object-contain"
          />
          <span className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
            Soporte OMEGASYS
          </span>
        </div>

        {/* Usuario + Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-800 dark:text-white">{user.nombre}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            title="Cerrar sesión"
          >
            <CiLogout  className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </Card>
    
    
  );
}
