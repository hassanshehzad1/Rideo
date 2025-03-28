import React from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem("token");
      
    const navigate = useNavigate();
    
    (() => {
        if (!token) {
            navigate("/captains/login");
        }
    },[token, navigate])
    if(!token) return navigate("/captains/login");
    return (<>{children}</>)
}

export default CaptainProtectWrapper