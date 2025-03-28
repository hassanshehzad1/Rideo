import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/Images/logo.png"; // Adjust the path as necessary
const CaptainSign = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
       const navigate = useNavigate(); // For redirect after successful login
   
       const onSubmit = async (data) => {
           console.log("Form Submitted:", data);
   
       };
   
       return (
           <div className="p-5 h-screen flex flex-col justify-between">
               <div>
                   <img className="w-16 mb-10" src={logo} alt="Rideo Logo" />
   
                   <form onSubmit={handleSubmit(onSubmit)}>
                       {/* Full name (firstName and lastName in one row) */}
                       <div className="flex justify-between gap-4">
                           <div className="w-1/2">
                               <h3 className="text-lg font-medium mb-2">First Name</h3>
                               <input
                                   {...register("firstName", {
                                       required: "First name is required",
                                       minLength: {
                                           value: 2,
                                           message: "First name must be at least 2 characters",
                                       },
                                   })}
                                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#f13a28]"
                                   placeholder="Enter your first name"
                               />
                               {errors.firstName && (
                                   <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                               )}
                           </div>
                           <div className="w-1/2">
                               <h3 className="text-lg font-medium mb-2">Last Name</h3>
                               <input
                                   {...register("lastName", {
                                       required: "Last name is required",
                                       minLength: {
                                           value: 2,
                                           message: "Last name must be at least 2 characters",
                                       },
                                   })}
                                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#f13a28]"
                                   placeholder="Enter your last name"
                               />
                               {errors.lastName && (
                                   <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                               )}
                           </div>
                       </div>
   
                       {/* Email */}
                       <h3 className="text-lg font-medium mb-2 mt-4">Email</h3>
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
   
                       {/* Password */}
                       <h3 className="text-lg font-medium mb-2 mt-4">Password</h3>
                       <input
                           {...register("password", {
                               required: "Password is required",
                               minLength: {
                                   value: 8,
                                   message: "Password must be at least 8 characters",
                               },
                           })}
                           type="password"
                           className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#f13a28]"
                           placeholder="Enter your password"
                       />
                       {errors.password && (
                           <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                       )}
   
                       {/* Submit Button */}
                       <button
                           type="submit"
                           className="flex items-center justify-center w-full bg-[#f13a28] text-white py-3 rounded cursor-pointer hover:bg-[#d32f2f] transition-colors mt-7"
                       >
                           Start your journey
                       </button>
                   </form>
   
                   <p className="text-center mt-4">
                       Already have an account?{' '}
                       <Link to="/users/login" className="text-blue-500 hover:underline">
                           Log in as captain
                       </Link>
                   </p>
               </div>
               {/* Extra small */}
               <p className="text-sm text-center text-gray-800">By continuing, you allow Rideo and its affiliates to contact you via calls, WhatsApp, SMS, or email, including automated messages, using the contact details you provide. </p>
               <div>
                   <Link
                       to="/users/register"
                       className="flex items-center justify-center w-full bg-[#1248c7] text-white py-3 rounded cursor-pointer hover:bg-[#1248c9] transition-colors mt-7"
                   >
                       Sign up as user
                   </Link>
               </div>
   
   
           </div>
       );
}

export default CaptainSign