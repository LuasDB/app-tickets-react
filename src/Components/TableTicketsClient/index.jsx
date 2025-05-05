import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TableTicketsClient({ tickets, onViewTicket }) {
  const getStatusColor = (status) => {
    return status === 'open' ? 'bg-green-500' : 'bg-gray-500'
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'bg-red-500'
      case 'Media': return 'bg-yellow-500'
      case 'Baja': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Acciones</TableHead>
            <TableHead>Ultima Actualización</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket._id} className='text-left'>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status === 'open' ? 'Abierto' : 'Cerrado'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onViewTicket(ticket)} 
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Ver Detalles
                </Button>
              </TableCell>
              <TableCell className='flex flex-col text-center'>
                <div>{new Date(ticket.messages[ticket.messages.length - 1].createdAt).toLocaleDateString()}</div>
                <div>{new Date(ticket.messages[ticket.messages.length - 1].createdAt).toLocaleTimeString()}</div>
                 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
