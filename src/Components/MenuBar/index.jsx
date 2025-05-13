import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../Card"
import Col from "./../Col"
import { CiLogout } from "react-icons/ci"
import { useAuth } from './../../Context/AuthContext'
import  logo  from './../../assets/logo_omegasys.png'
import logoDark from './../../assets/omegasys_white.png'

export default function MenuBar({...props}) {
  const {isMobile} = props
  const { user, logout} = useAuth()
  const navigate = useNavigate()
  const [isDarkMode,setIsDarkMode] = useState(false)
  useEffect(()=>{
    if(!user){
    navigate('/login')
    }
    const root = document.documentElement
    const checkDark = () => setIsDarkMode(root.classList.contains("dark"))

    checkDark(); 
    const observer = new MutationObserver(checkDark)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  },[])
  const handleLogout = ()=>{
    logout()
    navigate('/login')

  }

  return (
    
<Card className="p-2 w-[100%]">
      <div className={`${isMobile?'flex-col':' flex-row'} flex items-center justify-between w-full`}>
       
        <div className={`${isMobile?'flex-row':' flex-row'} flex items-center gap-2 dark:text-white`}>
          <img
            src={isDarkMode ? logoDark : logo}
            alt="Logo de la empresa"
            className="h-10 object-contain"
          />
          <span className={`${isMobile?'text-[12px] ':'text-xl font-semibold block ' }   text-gray-800 dark:text-white  `}>
            Soporte OMEGASYS
          </span>
        </div>

        {/* Usuario + Logout */}
        <div className={`${isMobile ? 'mt-4 flex-row justify-between w-full' : ' items-center gap-4 justify-between'} flex`}>
          <div className="text-right sm:block">
            <div className="text-[10px] font-medium text-gray-800 dark:text-white">{user.nombre}</div>
            <div className="text-xs text-gray-500">{user.company}</div>
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
