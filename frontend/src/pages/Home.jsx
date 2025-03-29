import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import { useForm } from 'react-hook-form'; // Import useForm
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehicleSuggest from '../components/VehicleSuggest';
import ConfirmPanel from '../components/ConfirmPanel';
import DriverLook from '../components/DriverLook';
import WaitDriver from '../components/WaitDriver';

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const { register, handleSubmit } = useForm(); // Initialize useForm
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehicleRef = useRef(null);
  const confirmPanelRef = useRef(null);
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);

  const [waitDriver, setWaitDriver] = useState(false);
  const waitDriverRef = useRef(null)

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


  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img className="w-16 absolute left-5 top-5 " src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="image" />

      <div className='h-screen w-screen'>
        <img className="h-full w-full object-cover" src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="image" />
      </div>
      <div className='flex-col flex justify-end h-screen absolute top-0 w-full'>
        <div className="h-[40%] p-6 bg-white relative">
          <h5 ref={panelCloseRef} className='absolute opacity-0 right-6 top-6 text-2xl' onClick={() => setPanelOpen(false)}>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className="text-2xl font-semibold">
            Find a ride
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}> {/* Add handleSubmit */}
            <div className="line absolute h-16 w-1 top-[43%] left-10 bg-gray-800 rounded-full"></div>
            <input
              {...register("pickupLocation")} // Register pickupLocation
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              placeholder='Add a pick up location'
            />
            <input
              {...register("destination")} // Register destination
              onClick={() => setPanelOpen(true)}
              className="bg-[#eee] px-12 py-2 mb-5 text-lg rounded-lg w-full mt-3"
              placeholder='Enter your destination'
            />
          </form>
        </div>

        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>
      </div>

      {/* Vehicle panel */}
      <div ref={vehicleRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <VehicleSuggest setConfirmPanel={setConfirmPanel} setVehiclePanel={setVehiclePanel} />
      </div>
      {/* Confirm panel */}
      <div ref={confirmPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmPanel setConfirmPanel={setConfirmPanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* Vehicle found */}
      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <DriverLook setVehicleFound={setVehicleFound} />
      </div>


      {/* Driver waiting */}
      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <WaitDriver setWaitDriver={setWaitDriver} />
      </div>


    </div>
  );
};

export default Home;