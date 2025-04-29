import api from "./apiService";

const ticketsService = {
    getAll: (userId)=> api.get(`tickets/${userId}`),
    getById: (id)=> api.get(`collections/tickets/${id}`),
    create: (data)=> api.post('tickets/',data),
    update:(id,newData)=> api.patch(`tickets/add-message/${id}`,newData),
    remove:(id)=> api.delete(`collection/delete-one/tickets/${id}`)
}

export default ticketsService