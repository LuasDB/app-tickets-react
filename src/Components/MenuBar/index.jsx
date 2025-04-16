import { useNavigate } from "react-router-dom";
import Card from "../Card";
import Col from "./../Col"
import { CiLogout } from "react-icons/ci";
import { useAuth } from './../../Context/AuthContext'
import { useEffect } from "react";

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
    
<Card className="p-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Logo de la empresa"
            className="w-5 h-5 object-contain"
          />
          <span className="text-xl font-semibold text-gray-800 hidden sm:block">
            Mi Empresa
          </span>
        </div>

        {/* Usuario + Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-800">{user.nombre}</div>
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
