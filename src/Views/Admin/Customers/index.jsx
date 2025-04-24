import { useEffect, useState } from 'react'
import customersService from '@/API/customersService'

import { Button } from '@/components/ui/button'
import Card from '@/Components/Card'
import Table from '@/Components/Table'
import ModalViewEditClient from '@/Components/ModalViewEditClient'
import ModalFormClient from '@/Components/ModalFormClient'

export default function Customers(){

    const [customers,setCustomers] = useState([])
    const colums =[
        {key:'name',label:'Nombre'},
        {key:'email',label:'Email'},
        {key:'company',label:'Empresa'},
        {key:'serviceTimeTotal',label:'Horas a cuenta',render:(row)=>row.serviceTime?.total ?? 0 }

    ]

    const [newClient,setNewClient] = useState(false)

    const [itemSelected,setItemSelected] = useState(null)
    const [modo,setModo] = useState(null)

    const handleView = (item)=>{
        setItemSelected(item)
        setModo('ver')
    }
    const handleEdit = (item)=>{
        setItemSelected(item)
        setModo('edit')
    }
    const updateClient = (updatedItem)=>{
        console.log('Muestrem el item modificado',updatedItem)
        const newArray = customers.map((client)=> client._id === updatedItem._id ? updatedItem : client)
        setCustomers(newArray)
        console.log('Dame el nuevo costumewrs',newArray)

    }
    const addClient = async(id)=>{
        try {
            const { data } = await customersService.getById(id)
            if(data.success){
                setCustomers(prev => [...prev,data.data])
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleNewClient = ()=>{
        setNewClient(true)
    }

    
    const getCustomers = async()=>{
        try {
            const { data } = await customersService.getAll()
            
            if(data.success){
                const custom = data.data.filter(item => item.role === 'client')
                console.log('Este es el resultado a imprimir',custom)
                setCustomers(custom)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCustomers()
    },[])



    return (
        <>
            <Card className='flex flex-col'>
                <Button 
                className='max-w-[280px] text-white bg-indigo-600 hover:bg-indigo-700'
                onClick={handleNewClient}
                >Nuevo cliente</Button>
                <Table 
                data={customers} 
                colums={colums}
                onView={handleView}
                onEdit={handleEdit}
                />
                {itemSelected && (
                    <ModalViewEditClient
                        item={itemSelected}
                        modo={modo}
                        onClose={()=> setItemSelected(null)}
                        onUpdate={updateClient}
                    />
                )}
                {newClient && (
                    <ModalFormClient openForm={newClient} onClose={()=>setNewClient(false) } onAdd={addClient}/>
                )}


            </Card>
        </>
    )
}