import customersService from "@/API/customersService"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { FaEdit,FaTrash } from "react-icons/fa"
import { useEffect, useState } from "react"
import { Toaster,toast } from "sonner"


export default function Users(){
    const [data,setData] = useState([])
    const [isModalOpen,setIsModalOpen] = useState(false)

    useEffect(()=>{
        const usersFetch = async()=>{
            try {
                const { data } = await customersService.getUsers()
                setData(data.data)
            } catch (error) {
                toast.error(error)
            }
        }
        usersFetch()
    },[])
    return (
        <div className="container w-full p-6">
            <Toaster />
            <Button className="dark:bg-blue-400 dark:hover:bg-blue-600">Nuevo usuario</Button>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='min-w-[150px]'>Nombre</TableHead>
                            <TableHead className='min-w-[150px]'>Tipo de usuario</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((ticket) => (
                        <TableRow key={ticket._id} className='text-left'>
                            <TableCell>{ticket.name}</TableCell>
                            <TableCell>{ticket.role}</TableCell>
                            <TableCell className="flex flex-row gap-6">
                                <FaEdit className="  text-blue-400 cursor-pointer hover:text-blue-600"
                                    onClick={()=>setIsModalOpen(true)}
                                />
                                <FaTrash className=" text-red-400 cursor-pointer hover:text-red-600"/> 
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={isModalOpen}>

            </Dialog>
            


        </div>
    )
}