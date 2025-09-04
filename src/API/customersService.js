import api from  './apiService'

const customersService = {
    getAll: ()=> api.get('collections/users'),
    getById:(id)=> api.get(`collections/users/${id}`),
    create:(data)=> api.post('auth/register',data),
    update:(id,newData)=> api.patch(`collections/update-one/users/${id}`,newData),
    remove:(id) => api.delete(`collections/delete-one/users/${id}`),
    getUsers:()=>api.get('collections/users/system')
}

export default customersService