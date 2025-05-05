import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from "@mui/material";
import customersService from '@/API/customersService';
import CustomFormGroup from '../Utilitys/CustomFormGroup';
import SupportTicketForm from '@/Components/SupportTicketForm'
import ticketsService from '@/API/ticketsService';
import { useAuth } from '@/Context/AuthContext';

export default function ModalFormNewTicket({openForm,onClose,onAdd}){
    const [formData,setFormData] = useState({
        issue:'',
        description:'',
        
    })
    const { user } = useAuth()
    const [formError,setFormError] = useState({})

    const [error,setError] = useState(false)
    const [messageError,setMessageError] = useState('')
    const [isCreate,setIsCreate] = useState(false)

    const handleChange = (e)=>{
        e.preventDefault()
        const { name, value, type, checked } = e.target
        setFormData(prev=>({
            ...prev,
            [name]:type === 'checkbox' ? checked : value
        }))

       

    }

    const validateForm = ()=>{
        const empty={}
        for(const [key,value] of Object.entries(formData)){
            if(value.trim() === ''){
                empty[key]='Vacio'
            }
        }
       setFormError(empty)
       if(Object.keys(empty).length > 0){return false}

       return true

    }
    
    const handleSubmit = async()=>{
        console.log('[PASO 1]')
        if(!validateForm()){
           setError(true)
           setIsCreate(false)
           setMessageError('Todos los campos deben ser llenados')
           return
        }
        try {
            console.log('ENVIANDO TICKET',formData)
            const { data } = await ticketsService.create({
                issue:formData.issue,
                user,
                firstMessage:{message:formData.description,date:new Date().toISOString(),user},
                createAt:new Date().toISOString()})
            if(data.success){
                setError(false)
                setIsCreate(true)
                console.log('Nuevo Ticket',data.messages)
                // onAdd(data.data.id)
                setTimeout(() => {
                    onClose()
                }, 3000);
            }
            
        } catch (error) {
            setError(true)
            setIsCreate(false)
            setMessageError(`'Algo salio mal, no se logro enviar'[Error]:${error}`)
        }
        

    }


    return (
        <Dialog open={openForm} onOpenChange={onClose}>
            <DialogContent className="bg-gray-50 text-blue-800 dark:bg-gray-900 dark:text-white w-full max-w-4xl">
            {isCreate && (<Alert severity="success" onClose={() => setIsCreate(false)}>Se Creo el registro</Alert>)}
            <DialogHeader>
                <DialogTitle>Nuevo Ticket 2</DialogTitle>
            </DialogHeader>
                <CustomFormGroup label={'Titulo'} name={'tittle'} onChange={handleChange}  error={formError.tittle }/>
                <SupportTicketForm label={'Descripción del problema'} name={'description'} onChange={handleChange} error={formError.description}/>
                <Button 
                    className="bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={handleSubmit}>
                Enviar
              </Button>
              {error && (<Alert severity="warning" onClose={() => setError(false)}>{messageError}</Alert>)}
            </DialogContent>
        </Dialog>
    )
}