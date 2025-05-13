import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Check, ShoppingCart } from "lucide-react"
import { toast, Toaster } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Import DialogClose for the cancel button
} from "@/components/ui/dialog"
import ticketsService from '@/API/ticketsService'
import { useAuth } from '@/Context/AuthContext'

export function PurchaseHoursForm() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false) // State for modal
  const { user } = useAuth()
  const plans = [
    {
      id: 1,
      hours: 20,
      price: 2000,
      pricePerHour: 100,
      recommended: false,
      planName:'Básico'
    },
    {
      id: 2,
      hours: 50,
      price: 4500,
      pricePerHour: 90,
      recommended: true,
      planName:'Estandar'
      
    },
    {
      id: 3,
      hours: 100,
      price: 8000,
      pricePerHour: 80,
      recommended: false,
      planName:'Pro'
    }
  ]

  const handleConfirmPurchase = async () => {
    if (!selectedPlan) return
    
    setIsProcessing(true)
    try {
      
      const {data} = await ticketsService.hoursPurchases({
        user,selectedPlan,createdAt:new Date().toISOString(),status:'open'
      })

      if(data.success){
        toast.success('Solicitud realizada con éxito')
        setSelectedPlan(null) 
        setIsConfirmModalOpen(false) 
        console.log(data)
      }
      
    } catch (error) {
      toast.error('Error al procesar la compra',error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="w-full">
      <Toaster />
      <CardHeader>
        <CardTitle className="text-2xl">Comprar Horas de Servicio</CardTitle>
        <CardDescription>
          Selecciona el paquete de horas que mejor se adapte a tus necesidades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedPlan?.id === plan.id 
                  ? 'border-2 border-primary shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => !isProcessing && setSelectedPlan(plan)}
            >
              {plan.recommended && (
                <Badge className="absolute top-2 right-2 bg-green-500">
                  Recomendado
                </Badge>
              )}
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-2xl font-bold text-blue-800">{plan.planName}</h3>
                  <h2 className="font-bold text-lg">{plan.hours} horas</h2>
                </div>
                
                <div className="space-y-2">
                  <p className="text-3xl font-bold">
                    ${plan.price.toLocaleString()}
                    <span className="text-sm font-normal text-muted-foreground">
                      {' '}MXN
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${plan.pricePerHour} MXN / hora
                  </p>
                </div>

                {selectedPlan?.id === plan.id && (
                  <div className="absolute top-2 left-2">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          
          <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
            <DialogTrigger asChild>
              <Button
            className="w-full md:w-auto bg-primary"
            size="lg"
                disabled={!selectedPlan || isProcessing} // Disable trigger if no plan or processing
          >
                <ShoppingCart className="mr-2 h-4 w-4" />
            {selectedPlan 
                  ? `Comprar ${selectedPlan.hours} horas`
              : 'Selecciona un plan'}
          </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirmar Paquete</DialogTitle>
                <DialogDescription>
                  Estás a punto de solicitar la compra del siguiente paquete de horas.
                </DialogDescription>
              </DialogHeader>
              {selectedPlan && (
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Paquete:</span>
                    <span className="font-medium">{selectedPlan.hours} horas</span>
        </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Precio:</span>
                    <span className="font-medium">${selectedPlan.price.toLocaleString()} MXN</span>
        </div>
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isProcessing}>Cancelar</Button>
                </DialogClose>
                <Button 
                  onClick={handleConfirmPurchase} 
                  disabled={isProcessing}
                  className="bg-primary"
                >
                  {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            * Los precios incluyen IVA
            <br />
            * Las horas no expiran
            <br />
            * Soporte prioritario incluido
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
