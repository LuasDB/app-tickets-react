import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function ModalViewReuqestHours({ request, open, onClose,updateHoursService  }) {

  const [formData,setFormData]=useState({

  })
  

  if (!request) return null

  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[800px] h-[90vh] flex flex-col p-0 dark:bg-gray-800 dark:text-gray-50">
        <div className={` px-6 py-4 border-b dark:text-white`}>
          <DialogHeader >
            <DialogTitle >Solicitud</DialogTitle>
            <DialogTitle className="text-gray-800' dark:text-white">{request.user.company}</DialogTitle>
            <DialogDescription>
              <div className='flex flex-row justify-between'>
                
                <CardContent className="py-4 text-center text-gray-500">
                Solicitado el {new Date(request.createdAt).toLocaleDateString()}, {new Date(request.createdAt).toLocaleTimeString()} 
                </CardContent>
                <div>
                  <h2 className='text-2xl'>{request.selectedPlan.planName}</h2>
                </div>
                
                
              </div>
              
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className={` px-6 py-4 border-b dark:text-white`}>
          <p>El usuario {request.user.nombre} solicita la compra de {request.selectedPlan.hours} horas, por el precio de ${request.selectedPlan.price}</p>
          <Button variant="outline" size="sm" type="button" onClick={() => updateHoursService({
            hours:request.selectedPlan.hours,
            price:request.selectedPlan.price,
            clsedAt:new Date().toISOString(),
            request
          })} 
          className='group mt-5 relative w-[50%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Aceptar
        </Button>
          
        </div>

        <div className={` px-6 py-4 border-b dark:text-white`}>
          <p>Personalizar las horas a registrar</p>
          <div className="space-y-2">
                      <label htmlFor="hours" className="text-sm font-medium text-gray-700 dark:text-gray-300">Horas</label>
                      <Input
                        id="hours"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        placeholder="Cuantas horas vas a vender?"
                        required
                        className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="hours" className="text-sm font-medium text-gray-700 dark:text-gray-300">Precio</label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Precio vendido"
                        type='number'
                        required
                        className='appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          
                      />
                    </div>
          <Button variant="outline" size="sm" type="button" onClick={() => updateHoursService({
             hours:parseInt(formData.hours),
              price:parseInt(formData.price),
              createdAt:new Date().toISOString(),
              request
          })} 
          className='group mt-5 relative w-[50%] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Aceptar
        </Button>
          
        </div>
        


     
      </DialogContent>
    </Dialog>
  )

}
