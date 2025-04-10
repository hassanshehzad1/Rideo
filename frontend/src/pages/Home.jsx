import React, { useContext, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import axios from 'axios'; // Import axios
import 'remixicon/fonts/remixicon.css';
import { useForm } from 'react-hook-form';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicleSuggest from '../components/VehicleSuggest';
import ConfirmPanel from '../components/ConfirmPanel';
import DriverLook from '../components/DriverLook';
import WaitDriver from '../components/WaitDriver';
import { toast } from "sonner"
import { UserDataContext } from "../context/UserContext.jsx"
import { SocketContext } from "../context/SocketContext.jsx"
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // State for suggestions
  const [activeField, setActiveField] = useState(null); // Track active field (pickup or destination)
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const { register, handleSubmit, setValue } = useForm(); // Initialize useForm
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehicleRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);

  const [waitDriver, setWaitDriver] = useState(false);
  const waitDriverRef = useRef(null)

  // Fare
  const [fare, setFare] = useState(0);
  // Vehicle type
  const [vehicleType, setVehicleType] = useState(null);
  // Routes
  const [routes, setRoutes] = useState({
    pickupLocation: "",
    destination: ""

  })
  const [ride, setRide] = useState({});



  // Setting socket
  const { user } = useContext(UserDataContext);

  const { socket } = useContext(SocketContext);
  useEffect(() => {
    if (!user) {
      return "User is not logged in"
    }

    const token = localStorage.getItem("token");
    // Sending message     
    socket.emit("join", { userId: user._id, userType: "user", token })

    socket.on("rideConfirmed", (ride) => {
      console.log("RideConfirmed", ride);
      setRide(ride);
      setWaitDriver(true);
      setVehicleFound(false);
      setConfirmPanel(false);
      setVehiclePanel(false)
    })
  }, [user, socket])


  socket.on("rideStarted", ride => {
    console.log("RideStarted", ride);
    setWaitDriver(false);
    navigate("/users/ride", { state: { ride } })
  })


  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '100%',
        duration: 0.5,
        ease: 'power2.out',
        opacity: 1,
        padding: 20
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.5,
        ease: 'power2.out',
        opacity: 0,
        padding: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }, [panelOpen, panelCloseRef]);


  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehicleRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(vehicleRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [vehiclePanel]);
  useGSAP(() => {
    if (confirmPanel) {
      gsap.to(confirmPanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(confirmPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [confirmPanel]);
  // Define onSubmit function


  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitDriver) {
      gsap.to(waitDriverRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(waitDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [waitDriver]);
  // Define onSubmit function


  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    setRoutes({
      pickupLocation: data?.pickupLocation,
      destination: data?.destination
    });
    // Get Fare
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rides/get-fare?pickup=${data.pickupLocation}&destination=${data.destination}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setFare(res?.data);
      setVehiclePanel(true);
      setPanelOpen(false);


    } catch (err) {
      console.error(err)
      console.error(err?.response?.data?.message);
      toast.error(err?.response?.data?.message)
    }

  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/maps/get-suggestion?input=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error?.response?.data?.message);
      // toast.error(error?.response?.data?.message);
    }
  };

  const handleInputChange = (field, value) => {
    setActiveField(field);
    fetchSuggestions(value);
  };

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === "pickupLocation") {
      setValue("pickupLocation", suggestion); // Set pickup location
    } else if (activeField === "destination") {
      setValue("destination", suggestion); // Set destination
    }
    // setPanelOpen(false);
  };


  // Create ride
  const createRide = async () => {


    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rides/create`, {
        pickup: routes.pickupLocation,
        destination: routes.destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })


      toast.success("Ride confirmed");
      console.log(result);
      setRide(result?.data)
      setVehicleFound(true)
      setConfirmPanel(false)
    } catch (err) {
      console.error(err)
      console.error(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  }
  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5 " src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="image" />

      <div className='h-screen w-screen'>
        <img className="h-full w-full object-cover" src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="image" />
      </div>
      <div className='flex-col flex justify-end h-screen absolute top-0 w-full'>
        <div className="h-[34%] p-6 bg-white relative ">
          <h5 ref={panelCloseRef} className='absolute opacity-0 right-6 top-6 text-2xl' onClick={() => setPanelOpen(false)}>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className="text-2xl font-semibold">
            Find a ride
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} className='mb-3'> {/* Add handleSubmit */}
            <div className="line absolute h-16 w-1 top-[33%] left-10 bg-gray-800 rounded-full"></div>
            <input
              {...register("pickupLocation")} // Register pickupLocation
              onClick={() => setPanelOpen(true)}
              onChange={(e) => handleInputChange("pickupLocation", e.target.value)} // Fetch suggestions
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              placeholder='Add a pick up location'
            />
            <input
              {...register("destination")} // Register destination
              onClick={() => setPanelOpen(true)}
              onChange={(e) => handleInputChange("destination", e.target.value)} // Fetch suggestions
              className="bg-[#eee] px-12 py-2 mb-5 text-lg rounded-lg w-full mt-3"
              placeholder='Enter your destination'
            />


            <button type="submit" className="w-full bg-orange-500 text-white px-2 py-2 rounded-lg text-center cursor-pointer">Add a Trip</button>
          </form>
        </div>

        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            suggestions={suggestions} // Pass suggestions
            onSuggestionSelect={handleSuggestionSelect} // Handle suggestion selection
          />
        </div>
      </div>

      {/* Vehicle panel */}
      <div ref={vehicleRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <VehicleSuggest setVehicleType={setVehicleType} fare={fare} setConfirmPanel={setConfirmPanel} setVehiclePanel={setVehiclePanel} />
      </div>
      {/* Confirm panel */}
      <div ref={confirmPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmPanel routes={routes} vehicleType={vehicleType} fare={fare} createRide={createRide} />
      </div>

      {/* Driver Look */}
      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <DriverLook ride={ride} setVehicleFound={setVehicleFound} />
      </div>


      {/* Driver waiting */}
      <div ref={waitDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <WaitDriver ride={ride} setWaitDriver={setWaitDriver} />
      </div>


    </div>
  );
};

export default Home;