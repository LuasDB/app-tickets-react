
import { Input } from '@/components/ui/input'

export default function CustomFormGroup({label,type,name,options,value,onChange,error}){
    
    return (
          <div className="space-y-4 ">
                  <div>
                      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                      </label>
                      {type === 'select' ? (
                        <Input
                        type={type}
                        name={name}
                        id={name}
                        value={value}
                        placeholder={label}
                        className={`'disabled:dark:text-white' ${error ? 'border-red-500 ring-1 ring-red-500':''}`}
                        onChange={onChange}
                      >
                         <option value="">--Selecciona una opción--</option>
                            {options.map(option => (
                            <option key={`option--${option.label}`} value={option.value}>{option.label}</option>
                            ))}
                      </Input>
                      ):(
                        <Input
                        type={type}
                        name={name}
                        id={name}
                        value={value}
                        placeholder={label}
                        className={`'disabled:dark:text-white' ${error ? 'border-red-500 ring-1 ring-red-500':''}`}
                        onChange={onChange}
                     />
                        )}
                      
                  </div>
                  
          
                  </div>
    )

}