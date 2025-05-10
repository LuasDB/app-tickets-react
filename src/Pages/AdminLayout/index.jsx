
import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'

import Row from './../../Components/Row'
import Col from './../../Components/Col'
import MenuBar from '../../Components/MenuBar'
import Sidebar from './../../Components/Sidebar'
import { routes } from '../../routes'
import { useAuth } from '@/Context/AuthContext'
import { RollerCoaster } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

const getRoutes = (routes)=>{
    return routes.map((route,index)=>{
        return (
            <Route 
                path={route.path} 
                element={route.component}
                key={`Layout-${index}`}
            />
        )

    })
}


export default function AdminLayout(){
    
    const { user } = useAuth()
    const [sidebarOpen,setSidebarOpen] = useState(true)
    const isMobile = useMediaQuery({query:'(max-width:768px)'})

    const toggleSidebar = ()=>{
        console.log('TOGGLE',sidebarOpen)

        setSidebarOpen(!sidebarOpen)
    }

    return (
        <>
        
        <div className='min-h-screen items-center bg-gray-50 dark:bg-gray-900 text-center text-gray-900 dark:text-white'>
            <Row className='fixed z-10 items-start flex justify-center md:mr-10 '>
                    <MenuBar isMobile={isMobile}/>
            </Row>
        
            
            <Row className={`${isMobile?'':'pr-10'} 'flex flex-row pt-[170px] justify-end '`}>
            {isMobile && (
                <button 
                    onClick={toggleSidebar}
                    className='p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 w-full'
                >
                    <svg className="w-6 h-6 ml-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                )}
                <Col size={3} className={`${isMobile?'w-full relative':'fixed w-[250px] top-[100px] left-0 bottom-0 block'} ${sidebarOpen ? 'block':'hidden'}`}>
                    {isMobile && (
                        <button 
                        onClick={toggleSidebar}
                        className='absolute top-6 right-4 tp-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800'
                        >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    )}
                    <Sidebar userRole={user.role} className={`${isMobile ? '':''} md:block w-full md:w-64 bg-red dark:bg-gray-800 shadow-md md:shadow-none md:static h-full z-20`} toggleSidebar={toggleSidebar} isMobile={isMobile}/>
                </Col>
                <Col size={isMobile?12:9} className=''>
                <div className={`${isMobile ? 'pl-4 m-0':''} 'flex-1 bg-gray-50 dark:bg-gray-900 '`}>
                    <Routes>
                    {getRoutes(routes)}
                    </Routes>
                </div>
                
                
                </Col>
            </Row>
        </div>
       
        
   
        </> )
       
}