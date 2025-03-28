import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {

    const {setUser } = useContext(UserDataContext);
    const navigate = useNavigate(); // For redirect after successful login

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // Include token in the request header
        }
    }).then((res) => {
        toast.success(res?.data?.message);
        setUser(null); // Clear user data from context
        localStorage.removeItem("token"); // Remove token from local storage
        localStorage.removeItem("user"); // Remove user data from local storage
        navigate("/users/login"); // Redirect to login page after successful logout
    }).catch((err) => {
        console.error(err?.response?.data?.message)
        toast.error(err?.response?.data?.message);
    });





    return (
        // logout()
        <h1 lassName="text-center text-blue-800 text-2xl">Logging out</h1>
    )
}

export default UserLogout