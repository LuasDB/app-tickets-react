import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PurchaseHoursForm } from "@/Components/PurchaseHoursForm"
import { Clock, Ticket, AlertCircle } from "lucide-react"
import { useAuth } from "@/Context/AuthContext"
import { CiWarning } from "react-icons/ci"

export function ConfigView() {
 

  const { user } = useAuth()
  

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Panel de Control</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Contratadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.serviceTime.total} horas</div>
            <p className="text-xs text-muted-foreground">
              Horas desde contratacion a la fecha
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Horas Disponibles</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parseFloat(user.serviceTime.remaining)} horas</div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-green-500 rounded-full" 
                  style={{ width: `${parseFloat(user.serviceTime.total) === 0 ? '0':(parseFloat(user.serviceTime.remaining * 100  / parseFloat(user.serviceTime.total)))}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {parseFloat(user.serviceTime.total) === 0 ? '0':Math.round((parseFloat(user.serviceTime.remaining) / parseFloat(user.serviceTime.total)) * 100)}%
              </span>
            </div>
          </CardContent>
        </Card>

        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Activos</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parseFloat(user.serviceTime.activeTickets)}</div>
            <p className="text-xs text-muted-foreground">
              De {parseFloat(user.serviceTime.tickets)} tickets totales
            </p>
          </CardContent>
        </Card>
      </div>

     
      {parseFloat(user.serviceTime.remaining) < 2 && (
        <Card className="bg-yellow-50 border-yellow-200 items-center">
          <CardContent className="flex flex-col md:flex-row justify-center gap-4 items-center p-4">
          <CiWarning className="h-10 w-10 text-yellow-500 "/>
            <div className="space-y-4">
            
              <p className="font-medium text-yellow-800">Horas de servicio bajas</p>
              <p className="text-sm text-yellow-600">
                Te quedan pocas horas de servicio. Considera comprar más horas para mantener el soporte ininterrumpido.
              </p>
              <Button 
              className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => document.getElementById('purchase-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Comprar Horas
            </Button>
            </div>
            
          </CardContent>
        </Card>
      )}

      {/* Sección de compra de horas */}
      <div id="purchase-section">
        <PurchaseHoursForm />
      </div>
    </div>
  )
}
