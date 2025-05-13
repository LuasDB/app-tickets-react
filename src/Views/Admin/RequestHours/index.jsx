import { useEffect, useState } from "react"
import ticketsService from "@/API/ticketsService"
import { TableRequestHours } from "@/Components/TableRequestHours"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster,toast } from "sonner"
import { ModalViewReuqestHours } from "@/Components/ModalViewReuqestHours"
export function RequestHours(){

    const [requests, setRequests] = useState(null)
    const [selectedRequest,setSelectedRequest] = useState(null)

    useEffect(()=>{
        getRequest()
    },[])

    

    const handleUpdateHours = async(request)=>{
        try {
            console.log('HORAS;',request)
            const { data } = await ticketsService.addHours(request)
            if(data.success){
                toast.success('Actualización correcta')
                setSelectedRequest(null)
                setRequests(requests.filter(item => item._id !== request.request._id))
            }
        } catch (error) {
            toast.error(`Algo salio mal al actualizar el registro, intenta de nuevo mas tarde ${error}`)
        }
    }

    const getRequest = async()=>{
        try {
            const { data } = await ticketsService.getRequests()
            if(data.success){
                console.log('Esto es lo que se recibe de solicitudes',data)
                setRequests(data.data)
            }
        } catch (error) {
            
            toast.error(`Algo salio mal, no se puede descargar la informacion, intente mas tarde.[ERROR]:${error}`)
        }
    }

    return (
        <div className='container mx-auto py-8 space-y-8'>
        <Toaster />
        <Tabs defaultValue="request">
            <TabsList>
                <TabsTrigger value='request'>Solicitudes</TabsTrigger>
                <TabsTrigger value='request'>Planes</TabsTrigger>
            </TabsList>
            <TabsContent value='request'>
                <TableRequestHours requests={requests} onViewRequest={setSelectedRequest}/>
            </TabsContent>
        </Tabs>
        <ModalViewReuqestHours
            request={selectedRequest}
            open={!!selectedRequest}
            onClose={() => setSelectedRequest(null)}
            updateHoursService={handleUpdateHours}
           
            />

        </div>
    )
}