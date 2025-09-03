import { useState, useEffect } from "react"
import { Input } from "./../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./../../components/ui/pagination"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FaFolderOpen ,FaUserEdit,FaTrash } from "react-icons/fa";
import { Search } from "lucide-react"

// Datos de ejemplo para la tabla


export default function Tabla({...props}) {
  const { data,colums, onView=()=>{},onEdit=()=>{},onDelete=()=>{} } = props
  const [busqueda, setBusqueda] = useState("")
  const [paginaActual, setPaginaActual] = useState(1)
  const [datosFiltrados, setDatosFiltrados] = useState([])
  const elementosPorPagina = 5

  // Filtrar datos basados en el término de búsqueda
  useEffect(() => {
    console.log('En busqueda :',busqueda)
    const resultadosFiltrados = data.filter((item) =>
      Object.values(item).some((valor) => valor?.toString().toLowerCase().includes(busqueda.toLowerCase())),
    )
    setDatosFiltrados(resultadosFiltrados)
    setPaginaActual(1) // Resetear a la primera página cuando se realiza una búsqueda
  }, [busqueda,data])

  // Calcular índices para la paginación
  const indiceUltimoElemento = paginaActual * elementosPorPagina
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina
  const elementosActuales = datosFiltrados.slice(indicePrimerElemento, indiceUltimoElemento)
  const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina)

  // Generar números de página para la paginación
  const numeroPaginas = []
  for (let i = 1; i <= totalPaginas; i++) {
    numeroPaginas.push(i)
  }

  // Manejar cambio de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina)
  }

  return (
    <>
        
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-8"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {colums.map((col)=>(
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {elementosActuales.length > 0 ? (
                elementosActuales.map((item) => (
                  <TableRow key={item._id}>
                    {colums.map((col)=>(
                    <TableCell key={`${col.key}-data`}>{col.render ? col.render(item) : item[col.key]}</TableCell>
                    ))}
                    <TableCell>
                      <FaFolderOpen className='cursor-pointer' onClick={()=>onView(item)}/>
                    </TableCell>
                      
                      <TableCell>
                      <FaUserEdit className='cursor-pointer' onClick={()=>onEdit(item)}/>
                      </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <FaTrash className='cursor-pointer' />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Deseas eliminar el registro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                  Esta acción no se puede deshacer. El registro será eliminado permanentemente.
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>onDelete(item._id)}>
                                  Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No se encontraron resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Información de paginación */}
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>
            Mostrando {elementosActuales.length > 0 ? indicePrimerElemento + 1 : 0} a{" "}
            {Math.min(indiceUltimoElemento, datosFiltrados.length)} de {datosFiltrados.length} registros
          </div>
          <div>
            Página {paginaActual} de {totalPaginas}
          </div>
        </div>

        {/* Controles de paginación */}
        {totalPaginas > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => cambiarPagina(Math.max(1, paginaActual - 1))}
                  className={paginaActual === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {numeroPaginas.map((numero) => (
                <PaginationItem key={numero}>
                  <PaginationLink
                    onClick={() => cambiarPagina(numero)}
                    isActive={paginaActual === numero}
                    className="cursor-pointer dark:bg-blue-500"
                  >
                    {numero}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => cambiarPagina(Math.min(totalPaginas, paginaActual + 1))}
                  className={paginaActual === totalPaginas ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
     
    </>
  )
}
