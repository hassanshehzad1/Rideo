import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { toast } from 'sonner';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);

    const token = localStorage.getItem("token");
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/captains/logout`, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((res) => {
        if (res.data.success) {
            localStorage.removeItem("token");
            localStorage.removeItem("captain");
            setCaptain(null);
            toast.success(res.data.message);
            navigate("/captains/login");

        }
    }).catch((err) => {
        console.error(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
    })

    return (
        <h1 className="text-blue-900 text-center text-3xl">Logging out...........</h1>
    )
}

export default CaptainLogout