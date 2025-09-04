import { IoPeopleSharp } from "react-icons/io5"
import { RiCustomerService2Fill } from "react-icons/ri"
import { MdAccountCircle } from "react-icons/md"
import Customers from "@/Views/Admin/Customers"
import {TicketsView} from "@/Views/Users/TicketsView"
import {Tickets} from "@/Views/Admin/Tickets"
import {RequestHours} from "@/Views/Admin/RequestHours"
import { ConfigView } from "@/Views/Users/Config"
import { MdOutlineRequestPage } from "react-icons/md"
import FormUsers from "./Components/FormUsers"
import Users from "@/Views/Admin/Users"

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
        path:'/ticketsAdmin',
        name:'Tickets',
        icon:<RiCustomerService2Fill />,
        component:<Tickets />,
        type:'menu',
        user:'admin'

    },
    {
        path:'/requestHoursService',
        name:'Solicitudes',
        icon:<MdOutlineRequestPage />,
        component:<RequestHours />,
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
        path:'/usuarios',
        name:'Usuarios',
        icon:<IoPeopleSharp />,
        component:<Users />,
        type:'menu',
        user:'admin'

    },
]

export { routes }