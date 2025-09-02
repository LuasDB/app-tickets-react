import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import ticketsService from "@/API/ticketsService"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ModalViewTicket } from '@/Components/ModalViewTicket'

import { Toaster,toast } from "sonner"
import { useAuth } from "@/Context/AuthContext"
import { useMediaQuery } from 'react-responsive'





export default function TablePagination(){

    const { user } = useAuth()
    const isMobile = useMediaQuery({query:'(max-width:768px)'})

    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(20)
    const [total,setTotal] = useState(0)
    const [search,setSearch] = useState('')
    const [totalPages,setTotalPages] = useState(0)
    const [data,setData] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const fetchTickets = async()=>{
            try {
                setLoading(true)
                const { data } = await ticketsService.getTicketsPag({params:{
                    page,limit,search,closed:true
                }})
                if(data.success){
                    setData(data.data.tickets)
                    setTotal(data.data.total)
                    setTotalPages(Math.ceil(Number(data.data.total)/Number(limit)))
                }

            } catch (error) {
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        fetchTickets()


    },[page,limit,search])


    const onPageChange = (newPage)=>{
        console.log(newPage)

    }

    const onViewTicket = (ticket)=>{
        setSelectedTicket(ticket)
    }

    const getStatusColor = (status) => {
    return status === 'open' ? 'bg-green-500' : 'bg-gray-500'
    }

    const handleSearch = (e)=>{
        e.preventDefault()
        const { name, value } = e.target
        if(value.length < 4){
            return
        }
        setSearch(value)
    }

    return (
        <div className="container">
            <Toaster />
            <div className="p-6">
                <Input placeholder={'Busqueda...'} onChange={handleSearch}/>
            </div>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='min-w-[150px]'>Empresa</TableHead>
                            <TableHead className='min-w-[150px]'>Asunto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha solicitud</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((ticket) => (
                        <TableRow key={ticket._id} className='text-left'>
                        
                        
                        <TableCell>{ticket.company}</TableCell>

                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>
                            <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status === 'open' ? 'Abierto' : 'Cerrado'}
                            </Badge>
                        </TableCell>
                        
                        <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Button variant="outline" size="sm" onClick={() => onViewTicket(ticket)} 
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                            Ver Detalles
                            </Button>
                        </TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {/* Controles */}
                <div className="flex justify-between items-center mt-4 text-sm ">
                <Button
                    className="text-white bg-indigo-600 hover:bg-indigo-700"
                    variant="outline"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                >
                    Anterior
                </Button>

                <span className="text-center">
                    Página <strong>{page}</strong> de <strong>{totalPages}</strong>
                </span>

                <Button
                    className="text-white bg-indigo-600 hover:bg-indigo-700"
                    
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    >
                    Siguiente
                </Button>
                </div>
            </div>

            <ModalViewTicket
                ticket={selectedTicket}
                open={!!selectedTicket}
                onClose={() => setSelectedTicket(null)}
                
                className={`${isMobile ? 'pt-10' : ''}`}
                typeUser={user.role === 'admin' ? true:false}
                
            />
        </div>
    )
}