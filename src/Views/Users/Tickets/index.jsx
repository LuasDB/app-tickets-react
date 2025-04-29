import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Card from '@/Components/Card'
import Table from '@/Components/Table'
import ModalViewTicket from '@/Components/ModalViewEditClient'
import ModalFormNewTicket from '@/Components/ModalFormNewTicket'
import { useAuth } from '@/Context/AuthContext'
import ticketsService from '@/API/ticketsService'

export default function Tickets(){

    const [itemSelected, setItemSelected] = useState(null)
    const [newTicket,setNewTicket] = useState(null)
    const [tickets,setTickets] = useState([])

    const colums =[
        {key:'tittle',label:'Titulo'},
        {key:'createAt',label:'Creación'},
        {key:'user.nombre',label:'Nombre'}

    ]


    const { user } = useAuth()

    useEffect(()=>{
        getTickets()
    },[])

    const getTickets = async()=>{
        try {
            const { data } = await ticketsService.getAll(user.userId)
            console.log(data)
            if(data.success){
                setTickets(data.data)
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleNewTicket = ()=>{
        console.log('Nuevo')
        setNewTicket(true)
    }
    const handleView = ()=>{

    }
    const updateTicket = ()=>{

    }
    const addNewTicket = ()=>{

    }
    return (
        <>
            <Card className='flex flex-col'>
                <Button 
                    className='max-w-[280px] text-white bg-indigo-600 hover:bg-indigo-700'
                    onClick={handleNewTicket}
                    >Nuevo Ticket</Button>
                    <h2>Mis Tickets</h2>
                    <Table 
                        data={tickets}
                        colums={colums}
                        onView={handleView}
                    />
                    {itemSelected && (
                        <ModalViewTicket 
                            item={itemSelected}
                            onClose={()=>setItemSelected(null)}
                            onUpdate={updateTicket}
                        />
                    )}
                    {newTicket && (
                        <ModalFormNewTicket openForm={newTicket}
                            onClose={()=>setNewTicket(false)}
                            onAdd={addNewTicket}
                        />
                    )}
            </Card>
        </>
    )
}