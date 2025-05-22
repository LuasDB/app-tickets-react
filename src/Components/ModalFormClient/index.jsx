import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from "@mui/material";
import customersService from '@/API/customersService';
import CustomFormGroup from '../Utilitys/CustomFormGroup';

export default function ModalFormClient({openForm,onClose,onAdd}){
    const [formData,setFormData] = useState({
        name:'',
        company:'',
        email:'',
        type:''

    })
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
        if(!validateForm()){
           setError(true)
           setIsCreate(false)
           setMessageError('Todos los campos deben ser llenados')
           return
        }
        try {

            const { data } = await customersService.create({...formData,role:'client'})
            if(data.success){
                setError(false)
                setIsCreate(true)
                console.log('nuewvo',data.data.id)
                onAdd(data.data.id)
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
                <DialogTitle>Nuevo cleinte</DialogTitle>
            </DialogHeader>
                <CustomFormGroup label={'Empresa'} name={'company'} onChange={handleChange}  error={formError.company }/>
                <CustomFormGroup label={'Contacto'} name={'name'} onChange={handleChange} error={formError.name}/>
                <CustomFormGroup label={'Correo'} name={'email'} onChange={handleChange} error={formError.email}/>
                <CustomFormGroup label={'Tipo de cliente'} name={'type'} onChange={handleChange} error={formError.type} type={'select'} options={[{label:'Cobro por horas',value:'normal'},{label:'Cliente con poliza',value:'poliza'}]}/>
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