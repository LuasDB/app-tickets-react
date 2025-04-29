import { IoPeopleSharp } from "react-icons/io5"
import { RiCustomerService2Fill } from "react-icons/ri"
import Customers from "@/Views/Admin/Customers"
import Tickets from "@/Views/Users/Tickets"
const routes = [
    {
        path:'/clientes',
        name:'Clientes',
        icon:<IoPeopleSharp />,
        component:<Customers />,
        type:'menu',
        user:'admin'

    },
    {
        path:'/tickets',
        name:'Tickets',
        icon: <RiCustomerService2Fill />,
        component:<Tickets />,
        type:'menu',
        user:'client'

    },
    {
        path:'/solicitudes',
        name:'Clientes',
        icon:<IoPeopleSharp />,
        component:<h1>Este es el componente de los Tickets del cliente</h1>,
        type:'menu',
        user:'admin'
    },
]

export { routes }