import { useEffect, useState } from "react"
import { useAuth } from '@/Context/AuthContext'
import { useMediaQuery } from 'react-responsive'
import { TableTicketsAdmin } from "@/Components/TableTicketsAdmin"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModalViewTicket } from '@/Components/ModalViewTicket'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster,toast } from "sonner"
import ticketsService from "@/API/ticketsService"
import socket from '@/API/socket'


export function Tickets(){
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [tickets, setTickets] = useState([]) 
    const { user } = useAuth()
    const isMobile = useMediaQuery({query:'(max-width:768px)'})

    useEffect(()=>{
        getDataTickets()
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
      const handleNewTicket = (newTicket)=>{
        setTickets(prev=>[
          ...prev,newTicket
        ])
      }
      const handleFinished = (data)=>{
        console.log('En el finished',data)
        console.log('En los tickets',tickets)
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
      socket.on('new_ticket',handleNewTicket)
      socket.on('finished_ticket', handleFinished)
    
      return () =>{ 
        socket.off('new_message', handleNewMessage)
        socket.off('new_ticket', handleNewTicket)
        socket.off('finished_ticket', handleFinished)
      }
    }, []);


    const getDataTickets = async()=>{
        try {
            const { data } = await ticketsService.getAllTickets()
            if(data.success){
                console.log(data)
                setTickets(data.data)
            }
        } catch (error) {
            toast.error(`Algo salio mal al cargar los datos,[ERROR]:${error}`)
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
    const handleFinishedTicket = async(data,ticket)=>{
      
      const toSend={
        ticketId:ticket._id,
        userId:ticket.userId,
        consumedHours:data.hours,
        resume:data.resume,
        finishedAt:new Date().toISOString()
      }
      try {
        console.log('Los datos a enviar :',toSend)
        const { data } = await ticketsService.finishedTicket(toSend)
        if(data.success){
          console.log(data)
          toast.success(`${data.message}`)
          setSelectedTicket(null)
        }
      } catch (error) {
        toast.error(`ALgo salio mal enviar información ${error}}`)
      }
    }

    const filteredTickets = tickets.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    return (
        <div className='container mx-auto py-8 space-y-8'>
        <Toaster />
            <Tabs defaultValue="tickets">
                <TabsList className='bg-gray-50 dark:bg-gray-800'>
                    <TabsTrigger value='tickets'>Tickets</TabsTrigger>
                </TabsList>

               <TabsContent value="tickets" className="space-y-4">
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
               
                         <TableTicketsAdmin 
                           tickets={filteredTickets}
                           onViewTicket={setSelectedTicket}
                           myUser={user}
                         />
                       </TabsContent>
            </Tabs>
            <ModalViewTicket
              ticket={selectedTicket}
              open={!!selectedTicket}
              onClose={() => setSelectedTicket(null)}
              onSendMessage={handleSendMessage}
              className={`${isMobile ? 'pt-10' : ''}`}
              typeUser={user.role === 'admin' ? true:false}
              finishedTicket={handleFinishedTicket}
              />

        </div>
    )

}