import Card from "../Card";
import { routes } from "../../routes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBasePath } from "@/Hooks/useBasePath";


export default function Sidebar({...props}){
    
    const { userRole } = props
    const basePath = useBasePath()

    const [tittle,setTittle] = useState('Bienvenido')
    const [selected,setSelected] = useState(null)
    useEffect(()=>{
    },[])

    const handleSelect = (item,index)=>{
        setTittle(item.name)
        setSelected(index)
    }


    return (
        <div className='' >
            <Card className='h-full'>
                <h1 className="font-bold text-gray-500">{tittle}</h1>
                <section>
                    <ul>
                        {
                            routes.map((route,index)=>{
                            if(route.type === 'menu' && userRole === route.user){
                                
                                return (
                                    <Link to={`${basePath}${route.path}`} key={`sidebar-${index}`}>
                                    <li  
                                    className={` p-3 rounded-md  mb-4 flex gap-4 items-center cursor-pointer text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${selected === index ? 'bg-indigo-400':''}`}
                                    onClick={()=>handleSelect(route,index)}>
                                    
                                    {route.icon} <span>{route.name}</span>
                                    
                                    </li></Link>
                                )
                            }
                        })}
                    </ul>
                </section>
            </Card>
    
        </div>)
        
}