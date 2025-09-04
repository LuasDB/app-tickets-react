import { useState } from "react"
import CustomFormGroup from '../Utilitys/CustomFormGroup';



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



    return (
        <div className="container">
            <CustomFormGroup label={'Nombre'} name={'name'} onChange={handleChange}  error={formError.name}/>
            <CustomFormGroup label={'Correo'} name={'email'} onChange={handleChange}  error={formError.email}/>
            <CustomFormGroup label={'Compañia'} name={'company'} onChange={handleChange}  error={formError.company}/>
            <CustomFormGroup label={'Tipo de usuario'} name={'role'} onChange={handleChange}  error={formError.company} type={'select'} options={[{label:'Administrador',value:'admin'},{label:'Técnico',value:'technical'}]}

            />
        </div>
        
        
    )
}