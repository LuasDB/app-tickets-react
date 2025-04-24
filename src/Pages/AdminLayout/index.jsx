
import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'

import Row from './../../Components/Row'
import Col from './../../Components/Col'
import MenuBar from '../../Components/MenuBar'
import Sidebar from './../../Components/Sidebar'
import { routes } from '../../routes'

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
    
    const [sidebarOpen,setSidebarOpen] = useState()

    return (
        <>
        
        <div className='min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 text-center text-gray-900 dark:text-white'>
            
            <Row className='fixed z-10 items-right flex justify-center mr-10 '>
                <MenuBar />
            </Row>
            <Row className='flex pt-[100px] justify-end pr-10'>
                <Col size={3} className='w-[250px] fixed top-[100px] left-0 bottom-0'>
                    <Sidebar />
                </Col>
                <Col size={9} >
                <div className='flex-1 bg-gray-50 dark:bg-gray-900 '>
                <Routes>
                 {getRoutes(routes)}
                </Routes>
                </div>
                
                
                </Col>
            </Row>
        </div>
       
        
   
        </> )
       
}