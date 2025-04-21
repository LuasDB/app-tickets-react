import { IoPeopleSharp } from "react-icons/io5"
import { RiCustomerService2Fill } from "react-icons/ri"
import Customers from "./Views/Customers"
const routes = [
    {
        path:'/clientes',
        name:'Clientes',
        icon:<IoPeopleSharp />,
        component:<Customers />,
        type:'menu'

    },
    {
        path:'/tickets',
        name:'Tickets',
        icon: <RiCustomerService2Fill />,
        component:<h1>Este es el componente de los Tickets</h1>,
        type:'menu'

    }
]

export { routes }