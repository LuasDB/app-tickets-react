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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function ModalViewTicket({ ticket, open, onClose,onSendMessage  }) {
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!ticket) return null

  const handleSubmitMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) {
      toast.error('Por favor, escribe un mensaje')
      return
    }

    setIsSubmitting(true)
    try {
      await onSendMessage(ticket._id, newMessage)
      setNewMessage('')
      setShowMessageForm(false)
      toast.success('Mensaje enviado exitosamente')
    } catch (error) {
      toast.error('Error al enviar el mensaje',error)
      setShowMessageForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] flex flex-col p-0 dark:bg-gray-800 dark:text-gray-50">
        <div className="px-6 py-4 border-b dark:text-white">
          <DialogHeader >
            <DialogTitle >Ticket #{ticket._id}</DialogTitle>
            <DialogTitle className="text-gray-800' dark:text-white">{ticket.title}</DialogTitle>
            <DialogDescription>
              <div className='flex flex-row justify-between'>
                
                <CardContent className="py-4 text-center text-gray-500">
                Creado el {new Date(ticket.createdAt).toLocaleDateString()}, {new Date(ticket.createdAt).toLocaleTimeString()}
                
                </CardContent>

                <div className="flex flex-row gap-5">
              <div>
                <h4 className="text-sm font-medium mb-1">Estado</h4>
                <Badge className={ticket.status === 'open' ? 'bg-green-500' : 'bg-gray-500'}>
                  {ticket.status === 'open' ? 'Abierto' : 'Cerrado'}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Prioridad</h4>
                <Badge className={
                  ticket.priority === 'Alta' ? 'bg-red-500' : 
                  ticket.priority === 'Media' ? 'bg-yellow-500' : 'bg-blue-500'
                }>
                  {ticket.priority}
                </Badge>
              </div>
              </div>
              </div>
              
            </DialogDescription>

          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
                 {/* Botón para mostrar formulario de respuesta */}
            {ticket.status === 'open' && !showMessageForm && (
              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowMessageForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Responder
                </Button>
              </div>
            )}
              {/* Formulario de respuesta */}
              {showMessageForm && ticket.status === 'open' && (
              <Card className='dark:bg-gray-900'>
                <CardContent className="pt-4">
                  <form onSubmit={handleSubmitMessage} className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium dark:text-white">Nuevo Mensaje</h4>
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí..."
                        className="min-h-[100px] appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowMessageForm(false)
                          setNewMessage('')
                        }}
                        disabled={isSubmitting}
                        className='dark:bg-red-600 bg-red-400 hover:bg-red-600 dark:hover:bg-red-400'
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {ticket.status === 'closed' && (
              <Card className="bg-muted">
                <CardContent className="py-4 text-center text-gray-500">
                  Este ticket está cerrado. No se pueden enviar más mensajes.
                </CardContent>
              </Card>
            )}

            

            {/* Historial de mensajes */}
            <div className="space-y-4">
              {ticket.messages
                ?.slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((message, index) => (
                  <Card key={`message-${index}`} className="w-full dark:bg-gray-900">
                    <CardContent className="pt-4">
                      <div className="border-b pb-2 mb-2">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-800">{message.user.nombre}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.createdAt).toLocaleDateString()}, {new Date(message.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <p className="dark:text-gray-50 whitespace-pre-wrap">{message.message}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

}
