import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout:10000,
})

apiClient.interceptors.response.use(
    response => response,
    error =>{
        if(error.response.status === 401){
            console.log('Token expirado')
        }
        return Promise.reject(error)
    }
)

apiClient.interceptors.request.use(
    config =>{
        if(!(config.data instanceof FormData)){
            config.headers['Content-Type']='application/json'
        }
        return config
    },
    error =>{
        return Promise.reject(error)
    }
)
export default apiClient