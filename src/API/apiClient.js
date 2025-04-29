import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout:10000,
})

api.interceptors.response.use(
    response => response,
    error =>{
        if(error.response.status === 401){
            console.log('Token expirado')
        }
        return Promise.reject(error)
    }
)

api.interceptors.request.use(
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
export default api