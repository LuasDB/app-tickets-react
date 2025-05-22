import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupportTicketForm } from '@/Components/SupportTicketForm'
import { TableTicketsClient } from '@/Components/TableTicketsClient'
import { ModalViewTicket } from '@/Components/ModalViewTicket'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster,toast } from "sonner"
import { useAuth } from '@/Context/AuthContext'
import { useMediaQuery } from 'react-responsive'

import ticketsService from '@/API/ticketsService'
import socket from '@/API/socket'

export function TicketsView() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tickets, setTickets] = useState([]) 
  const { user } = useAuth()
  const isMobile = useMediaQuery({query:'(max-width:768px)'})


  useEffect(()=>{
    getDataUser()
  },[])

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setTickets((prevTickets) => {
        const updated = prevTickets?.map((ticket) => {
          if (ticket._id === newMessage.ticketId) {
            return {
              ...ticket,
              messages: [...ticket.messages, newMessage.newMessage],
            };
          }
          return ticket;
        }) || [];
        return updated;
      });
    };
    const handleFinished = (data)=>{
      console.log('En el finished',data)
      console.log('En Los tickets',tickets)

      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket._id === data.ticketId
            ? {
                ...ticket,
                status: 'close',
                consumedHours: data.consumedHours,
                resume: data.resume,
                finishedAt: data.finishedAt
              }
            : ticket
        )
      )
      
    }
  
    socket.on('new_message', handleNewMessage)
    socket.on('finished_ticket', handleFinished)
  
    return () => {
      socket.off('new_message', handleNewMessage)
      socket.off('finished_ticket', handleFinished)

      };
  }, []);
  

  const getDataUser = async ()=>{
    try {
      const { data } = await ticketsService.getAllByUser(user.userId)
      if(data.success){
        console.log(data)
        
        setTickets(data.data)
      }
    } catch (error) {
      toast.error(`Algo salio mal al cargar la información:\n [ERROR]:${error}`)
    }
  }
  const handleCreateTicket = async(ticketData) => {
    
    const newTicket = {
      ...ticketData,
      status: 'open',
      createdAt: new Date().toISOString(),
      user,
      company:user.company,
      firstMessage:{
        title:ticketData.title,
        message:ticketData.description,
        user,
        createdAt: new Date().toISOString()
      }
    }
    try {
      
      const { data } = await ticketsService.create(newTicket)
      if(data.success){

        setTickets([...tickets,data.data])
        toast.success('Ticket creado exitosamente')
        return true
      }
      
    } catch (error) {
      setTickets([newTicket, ...tickets])
      toast.error('Algo salio mal al intentar comunicar con el servidor',error)
    }

   
  }
  const handleSendMessage = async(ticketId,newMessage)=>{
    try {
      const messageToSend ={
        message:newMessage,
        createdAt:new Date().toISOString(),
        user

      }
      const { data} = await ticketsService.update(ticketId,messageToSend)
      if(data.success){
        toast.success('Mensaje enviado correctamente')
        setSelectedTicket(null)

      }
    } catch (error) {
      toast.error(`'No se logro actualizar la información, intenta más tarde\n[ERROR]:${error}`)
    } 
  }

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-0 space-y-2">
      <h1 className="text-3xl font-bold">Sistema de Soporte Técnico</h1>
      <Toaster />
      <Tabs defaultValue="create" className="space-y-2">
        <TabsList className='bg-gray-50 dark:bg-gray-800'>
          <TabsTrigger value="create">Crear Ticket</TabsTrigger>
          <TabsTrigger value="list">Mis Tickets</TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="flex justify-center">
          <SupportTicketForm onSubmit={handleCreateTicket} />
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className='group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Limpiar
            </Button>
          </div>

          <TableTicketsClient 
            tickets={filteredTickets}
            onViewTicket={setSelectedTicket}
          />
        </TabsContent>
      </Tabs>

      <ModalViewTicket
        ticket={selectedTicket}
        open={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onSendMessage={handleSendMessage}
        className={`${isMobile ? 'pt-10' : ''}`}
      />
    </div>
  )
}
