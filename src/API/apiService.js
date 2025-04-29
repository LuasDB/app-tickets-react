import api from './apiClient'

const apiService = {
    get:(endpoint, config={})=> api.get(endpoint,config),
    post:(endpoint, data, config={})=> api.post(endpoint,data,config),
    patch: (endpoint, data, config = {}) => api.patch(endpoint, data, config),
    delete: (endpoint, config = {}) => api.delete(endpoint, config),

}

export default apiService