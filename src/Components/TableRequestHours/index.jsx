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
import { FaCheckDouble } from "react-icons/fa";
import { useAuth } from "@/Context/AuthContext";
import { FaEye } from "react-icons/fa"


export function TableRequestHours({ requests, onViewRequest }) {
  
  

  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-[150px]'>Empresa</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Horas</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Fecha de solicitud</TableHead>
            <TableHead>Ver Solicitud</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
        {requests?.map((req) => (
            <TableRow key={req._id} className='text-left'>
              <TableCell>{req.user.company}</TableCell>
              <TableCell>{req.selectedPlan.planName}</TableCell>
              <TableCell>{req.selectedPlan.hours} horas</TableCell>
              <TableCell>${req.selectedPlan.price}</TableCell>
              <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
              <TableCell><FaEye className='text-blue-400 cursor-pointer text-lg' onClick={()=>onViewRequest(req)}/> </TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
