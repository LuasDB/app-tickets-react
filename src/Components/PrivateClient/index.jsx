import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Private({children}){

    const { user , loading } = useAuth()
    if(loading) {
        return (<Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>)}
    if(!user){
        return <Navigate to='/login' replace/>
    }

    return children



}