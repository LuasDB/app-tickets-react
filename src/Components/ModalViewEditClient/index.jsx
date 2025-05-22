import { useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from "@mui/material";
import customersService from '@/API/customersService';


export default function ModalViewEditClient({item,modo,onClose,onUpdate}){

  const [error,setError] = useState(false)
  const [messageError,setMessageError] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    company:'',
  })
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    company: false,
  })

  const handleChange = (e)=>{
    e.preventDefault()
    const { name,value } = e.target
    setFormData({...formData,
      [name]:value
    })
  }

  const verification = ()=>{
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      company: formData.company.trim() === '',
    }
  
    setErrors(newErrors)
  
    
    const hasError = Object.values(newErrors).some((err) => err)
    if (hasError) {
     setError(true)
     setMessageError('Ningun campo puede estar vacio')
      return false
    }
  
    return true
  }

  const handleSubmit = async()=>{
    
    if(verification()){
    try {
      const { data } = await customersService.update(item._id,formData)

      if(data.success){
        setIsUpdate(true)
        setTimeout(()=>{
          onUpdate({...item,...formData})
          onClose()
        },1500)
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setMessageError('Algo salio Mal, por favor intente más tarde')
    }
      
    }

  }
    useEffect(()=>{
      setFormData({
        name:item.name,email:item.email,company:item.company,type:item.type
      })
    },[])

    return (
        <Dialog open={!!item} onOpenChange={onClose} >
        <DialogContent className="bg-gray-50 text-blue-800 dark:bg-gray-900 dark:text-white w-full max-w-4xl">
        {isUpdate && (<Alert severity="success" onClose={() => setIsUpdate(false)}>Se Actualizó el registro</Alert>)}
          <DialogHeader>
            <DialogTitle>{modo === 'ver' ? 'Datos de cliente' : 'Editar cliente'}</DialogTitle>
          </DialogHeader>
  
          <div className="space-y-4 ">
          <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre
              </label>
              <Input
                name='name'
                disabled={modo === 'ver'}
                value={formData.name}
                placeholder="Nombre"
                className={`'disabled:dark:text-white' ${errors.name ? 'border-red-500 ring-1 ring-red-500':''}`}
                onChange={handleChange}
              />
          </div>
          <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo
              </label>
              <Input
                name='email'
                disabled={modo === 'ver'}
                value={formData.email}
                placeholder="Nombre"
                className={`'disabled:dark:text-white' ${errors.email ? 'border-red-500 ring-1 ring-red-500':''}`}
                onChange={handleChange}
              />
          </div>
          <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Empresa
              </label>
              <Input
                name='company'
                disabled={modo === 'ver'}
                defaultValue={formData.company}
                placeholder="Nombre"
                className={`'disabled:dark:text-white' ${errors.company ? 'border-red-500 ring-1 ring-red-500':''}`}
                onChange={handleChange}
              />
          </div> 
          <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tipo de cliente
              </label>
              <Input
                name='type'
                disabled={modo === 'ver'}
                defaultValue={formData.type}
                placeholder="Tipo de cliente"
                className={`'disabled:dark:text-white' ${errors.type ? 'border-red-500 ring-1 ring-red-500':''}`}
                onChange={handleChange}
              />
          </div> 
  
            {modo === 'edit' && (
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleSubmit}>
                Guardar cambios
              </Button>
            )}
          </div>
          {error && (<Alert severity="warning" onClose={() => setError(false)}>{messageError}</Alert>)}
        </DialogContent>
            
        
      </Dialog>
    )


}