import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupportTicketForm } from '@/components/SupportTicketForm'
import { TableTicketsClient } from '@/components/TableTicketsClient'
import { ModalViewTicket } from '@/components/ModalViewTicket'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function TicketsView() {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tickets, setTickets] = useState([]) // En un caso real, esto vendría de una API

  const handleCreateTicket = (ticketData) => {
    // Aquí iría la lógica para crear el ticket en el backend
    const newTicket = {
      id: tickets.length + 1,
      ...ticketData,
      status: 'open',
      createdAt: new Date().toISOString(),
    }
    setTickets([newTicket, ...tickets])
    toast.success('Ticket creado exitosamente')
  }

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Sistema de Soporte Técnico</h1>
      
      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
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
      />
    </div>
  )
}
