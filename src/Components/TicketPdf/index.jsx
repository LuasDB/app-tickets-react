import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from '@/assets/logo_omegasys.png'

const TicketPDF = ({ ticket }) => {
    const [isLoading, setIsLoading] = useState(false);
    const generarPDF = () => {
    const element = document.getElementById('contenido-ticket');
    element.style.display='block'
    setIsLoading(true)

   setTimeout(() => {
    html2pdf()
      .set({
        margin: 10,
        filename: `ticket-${ticket._id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(element)
      .save()
      .then(() => {
        element.style.display = 'none'
        setIsLoading(false)
      });
  }, 100); 
  };

  return (
    <div className="p-4">
     
       {ticket.status === 'close' && ( <Button
        onClick={generarPDF}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
        {isLoading ? (
            <>
            <Loader2 className="animate-spin w-4 h-4" />
            Generando PDF...
            </>
        ) : (
            "Descargar PDF"
        )}
        </Button>
        )}

      <div
        id="contenido-ticket"
        className="bg-white p-6 rounded shadow-md mt-6 w-full max-w-2xl mx-auto text-gray-800 space-y-2"
        style={{ display: 'none' }}
      >
        {/* Logo de la empresa */}
        <div className="flex items-center justify-between mb-4">
          <img src={logo} alt="Logo" className="w-32" />
          <div className="text-right">
            <h1 className="text-2xl font-bold">Ticket de Soporte Técnico</h1>
            <p className="text-sm text-gray-500">#{ticket._id}</p>
          </div>
        </div>

        <div  className="rounded-xl p-2"
            style={{
                border: '1px solid #3B82F6', 
                borderRadius: '0.75rem', 
                padding: '0.5rem',
            }}
        >
            <p><strong>Cliente:</strong> {ticket.company}</p>
            <p><strong>Usuario:</strong> {ticket.user.nombre}</p>
            <p><strong>Correo:</strong> {ticket.user.email}</p>
            <p><strong>Fecha de solicitud:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
            <p><strong>Fecha de cierre:</strong> {new Date(ticket.finishedAt).toLocaleString()}</p>
            <p><strong>Horas del servicio:</strong> {ticket.consumedHours} Hrs</p>
        </div>
        
        <div  className="rounded-xl p-2"
            style={{
                border: '1px solid #3B82F6', // azul 500 de Tailwind
                borderRadius: '0.75rem', // rounded-xl
                padding: '0.5rem',
            }}>
            <h2 className="text-lg font-semibold">Resumen del Servicio</h2>
            <p className="mt-1 whitespace-pre-wrap">{ticket?.resume}</p>
        </div>


        
        <div className="mt-4" >
          <h2 className="text-lg font-semibold mb-2">Mensajes</h2>
          <ul className="list-disc list-inside space-y-1" style={{ pageBreakInside: 'avoid' }}>
            {ticket.messages
                ?.slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((msg, i) => (
              <li key={i}  className="rounded-xl pl-2 pr-2 pb-2"
                    style={{
                        border: '1px solid #3B82F6', // azul 500 de Tailwind
                        borderRadius: '0.75rem', // rounded-xl
                        padding: '1rem',
                        listStyle:'none'
                    }}>
                <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <strong >{msg.user.nombre}</strong>
                    <span className='text-gray-600'>{new Date(msg.createdAt).toLocaleString()}</span> 
                </div>
                <div className='flex flex-col'>
                    {msg.message}
                </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <footer className="text-center text-sm mt-6 text-gray-500">
          Generado automáticamente por el sistema de soporte técnico Omegasys
        </footer>
      </div>
    </div>
  );
};

export default TicketPDF;
