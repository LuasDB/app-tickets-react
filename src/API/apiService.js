import apiClient from './apiClient'

const apiService = {
    get:(endpoint, config={})=> apiClient.get(endpoint,config),
    post:(endpoint, data, config={})=> apiClient.post(endpoint,data,config),
    patch: (endpoint, data, config = {}) => apiClient.patch(endpoint, data, config),
    delete: (endpoint, config = {}) => apiClient.delete(endpoint, config),

}

export default apiService