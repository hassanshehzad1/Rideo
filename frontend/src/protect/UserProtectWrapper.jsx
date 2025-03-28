import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext.jsx';

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/users/login");
        }
    },[token, navigate])
    if(!token) return navigate("/users/login");
    return (<>{children}</>)

}

export default UserProtectWrapper