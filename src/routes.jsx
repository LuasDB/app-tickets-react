import { IoPeopleSharp } from "react-icons/io5"
import { RiCustomerService2Fill } from "react-icons/ri"
import { MdAccountCircle } from "react-icons/md"
import Customers from "@/Views/Admin/Customers"
import {TicketsView} from "@/Views/Users/TicketsView"
import { ConfigView } from "./Views/Users/Config"

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
        path:'/account',
        name:'Mi cuenta',
        icon: <MdAccountCircle />,
        component:<ConfigView />,
        type:'menu',
        user:'client'

    },
    {
        path:'/tickets',
        name:'Tickets',
        icon: <RiCustomerService2Fill />,
        component:<TicketsView />,
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