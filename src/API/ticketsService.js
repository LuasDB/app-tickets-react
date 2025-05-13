import { addHours } from "date-fns";
import api from "./apiService";

const ticketsService = {
    getAllByUser: (userId)=> api.get(`tickets/${userId}`),
    getAllTickets:()=> api.get(`tickets/`),
    getRequests:()=> api.get('tickets/requests/getall'),
    getById: (id)=> api.get(`collections/tickets/${id}`),
    create: (data)=> api.post('tickets/',data),
    hoursPurchases: (data)=> api.post('tickets/service-hours-purchases',data),
    addHours:(data)=> api.post(`/tickets/add-hours`,data),
    finishedTicket:(data) => api.post(`/tickets/finished-ticket`,data),
    update:(id,newData)=> api.patch(`tickets/add-message/${id}`,newData),
    remove:(id)=> api.delete(`collection/delete-one/tickets/${id}`)
}

export default ticketsService