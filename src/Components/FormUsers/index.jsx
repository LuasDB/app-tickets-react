import { useState } from "react"
import CustomFormGroup from '../Utilitys/CustomFormGroup';
import { Button } from '@/components/ui/button'
import { keyframes } from "styled-components";



export default function FormUsers(){
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        company:'',
        role:''
    })
    const [formError,setFormError] = useState({})

    const handleChange = (e)=>{
        e.preventDefault()
        const { name, value, type, checked } = e.target
        setFormData(prev=>({
            ...prev,
            [name]:type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        alert(
            Object.entries(formData).map(([key,value])=>`${key}:${value}`).join("\n")
        )
    }



    return (
        <form onSubmit={handleSubmit} className="container flex flex-col gap-4">
            <CustomFormGroup label={'Nombre'} name={'name'} onChange={handleChange}  error={formError.name} required={true}/>
            <CustomFormGroup label={'Correo'} name={'email'} onChange={handleChange}  error={formError.email} required={true}/>
            <CustomFormGroup label={'Compañia'} name={'company'} onChange={handleChange}  error={formError.company} required={true}/>
            <CustomFormGroup label={'Tipo de usuario'} name={'role'} onChange={handleChange}  error={formError.company} type={'select'} options={[{label:'Administrador',value:'admin'},{label:'Técnico',value:'technical'}]} required={true}/>
            <Button className="w-full md:w-[300px]" >Enviar</Button>
            
        </form>
        
        
    )
}