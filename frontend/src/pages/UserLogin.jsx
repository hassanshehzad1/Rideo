import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import logo from "../assets/Images/logo.png"; // Fixed logo import
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'sonner';
import axios from 'axios';
const UserLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // For redirect after successful login

    const {  setUser } = useContext(UserDataContext);
    const onSubmit = async (data) => {

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, data);

            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setUser(res?.data?.user);
                localStorage.setItem("token", res?.data?.token); // Store token in local storage
                localStorage.setItem("user", JSON.stringify(res?.data?.user)); // Store user data in local storage
                navigate("/home"); // Redirect to home page after successful login
            }

        } catch (err) {
            console.error(err?.response?.data?.message);
            toast.error(err?.response?.data?.message || "Something went wrong!");
        }

    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src={logo} alt="Rideo Logo" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-lg font-medium mb-2">Email</h3>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Please enter a valid email",
                            },
                        })}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#f13a28]"
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}

                    <h3 className="text-lg font-medium mb-2 mt-4">Password</h3>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#f13a28]"
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center w-full bg-[#f13a28] text-white py-3 rounded cursor-pointer hover:bg-[#d32f2f] transition-colors mt-7"
                    >
                        Start your journey
                    </button>
                </form>

                <p className="text-center mt-4">
                    New here?{' '}
                    <Link to="/users/register" className="text-blue-500 hover:underline">
                        Create new user
                    </Link>
                </p>
            </div>
            <div>
                <Link to="/captains/login" className="flex items-center justify-center w-full bg-[#1248c7] text-white py-3 rounded cursor-pointer hover:bg-[#1248c9] transition-colors mt-7">
                    Sign in as captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;