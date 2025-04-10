Rideo is a ride-sharing app where users can book rides by selecting their pickup, destination, and vehicle type, while captains can accept and manage ride requests. The app uses a microservices setup to handle different functionalities, ensuring scalability. Real-time features like ride notifications and location updates are powered by WebSockets, and RabbitMQ handles asynchronous events like ride creation.

Frontend: Built with React + Vite, styled with Tailwind CSS, and animated with GSAP.
Backend: Node.js with Express, MongoDB for data storage, and JWT for authentication.
Communication: REST APIs, RabbitMQ for events, and Socket.IO for real-time updates.
✨ Features
For Users:
Register, login, and manage your profile.
Book rides with options like car, bike, or auto.
Track rides in real-time and see driver details.
Pay with JazzCash (Pakistan-supported gateway).
For Captains:
Register with vehicle details, login, and manage your profile.
Accept/decline ride requests in real-time.
Update your location for better ride matching.
Mark rides as started or completed.
Real-Time Updates:
Instant notifications for ride requests, confirmations, and status changes.
Microservices:
Separate services for User, Captain, Ride, and Map functionalities.
Event-driven communication with RabbitMQ.
📂 Project Structure
Here’s how the project is organized:



 



 
Rideo/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components (e.g., LocationSearchPanel.jsx)
│   │   ├── pages/             # Page components (e.g., Home.jsx, CaptainsHome.jsx)
│   │   ├── con/           # State management (UserCon, CaptainCon)
│   │   ├── protect/           # Route protection (UserProtectper.jsx)
│   │   └── main.jsx           # Entry point
├── backend/
│   ├── User/                  # User Service (port: 3001)
│   ├── Captain/               # Captain Service (port: 3002)
│   ├── Ride/                  # Ride Service (port: 3003)
│   ├── Maps/                  # Map Service (port: 3004)
│   ├── Socket/                # WebSocket server (port: 3000)
├── .env                       # Environment variables
└── README.md                  # You're reading this!
🏗️ Microservices Architecture
Rideo uses a microservices setup to handle different parts of the app independently. Here’s a quick look:

Services
User Service (http://localhost:3001): Manages user registration, login, and profiles.
Captain Service (http://localhost:3002): Handles captain registration, location updates, and ride acceptance.
Ride Service (http://localhost:3003): Manages ride creation, fare calculation, and status updates.
Map Service (http://localhost:3004): Provides geolocation, distance, and route suggestions.
Socket Server (http://localhost:3000): Powers real-time communication with WebSockets.
Communication
REST APIs: For direct service-to-service calls (e.g., fetching user profile).
RabbitMQ: For async events (e.g., notifying captains of new rides).
WebSockets: For real-time updates (e.g., ride confirmation notifications).
🖥️ Frontend Overview
The frontend is built with React and Vite, offering a fast development experience with Hot Module Replacement (HMR). We use Tailwind CSS for styling, GSAP for animations, and React Hook Form for form handling.

Key Pages
User Home (Home.jsx): Where users book rides.
Captain Home (CaptainsHome.jsx): Where captains manage ride requests.
Riding (Riding.jsx): Shows ongoing ride details for users.
Key Components
Below are the main components used in the user flow, with examples for each.

Example: Using LocationSearchPanel Component
This component lets users select their pickup and destination locations.

jsx

 



 
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home  () > {
  const [panelOpen, setPanelOpen]  useState(false);
  const [vehiclePanel, setVehiclePanel]  useState(false);

  return (
    <div>
      <LocationSearchPanel
        setPanelOpen{setPanelOpen}
        setVehiclePanel{setVehiclePanel}
      />
    </div>
  );
};
Output: A panel where users can type "123 Main St" as pickup and "456 Park Ave" as destination.

Example: Using VehicleSuggest Component
This component shows available vehicles with fares and lets users select one.

jsx

 



 
import VehicleSuggest from "../components/VehicleSuggest";

const Home  () > {
  const [confirmPanel, setConfirmPanel]  useState(false);
  const [vehiclePanel, setVehiclePanel]  useState(false);

  return (
    <div>
      <VehicleSuggest
        setConfirmPanel{setConfirmPanel}
        setVehiclePanel{setVehiclePanel}
      />
    </div>
  );
};
Output: A list showing "UberGo (4 seats, PKR 463)", "Moto (1 seat, PKR 233)", and "Auto (3 seats, PKR 303)".

Example: Using ConfirmPanel Component
This component lets users confirm their ride after selecting a vehicle.

jsx

 



 
import ConfirmPanel from "../components/ConfirmPanel";

const Home  () > {
  const [confirmPanel, setConfirmPanel]  useState(false);
  const [vehicleFound, setVehicleFound]  useState(false);

  const createRide  async () > {
    // Logic to create a ride
  };

  return (
    <div>
      <ConfirmPanel
        routes{{ pickupLocation: "123 Main St", destination: "456 Park Ave" }}
        vehicleType"car"
        fare{{ car: 463 }}
        createRide{createRide}
        setConfirmPanel{setConfirmPanel}
        setVehicleFound{setVehicleFound}
      />
    </div>
  );
};
Output: A panel showing ride details (pickup, destination, fare) with a "Confirm Ride" button.

Example: Using DriverLook Component
This component shows driver details after the ride is confirmed.

jsx

 



 
import DriverLook from "../components/DriverLook";

const Home  () > {
  const [vehicleFound, setVehicleFound]  useState(true);
  const ride  {
    captain: { fullName: { firstName: "Jane", lastName: "Doe" } },
    vehicleType: "car",
  };

  return (
    <div>
      <DriverLook ride{ride} setVehicleFound{setVehicleFound} />
    </div>
  );
};
Output: A panel showing "Driver: Jane Doe, Vehicle: Car".

Example: Using WaitDriver Component
This component shows a waiting status while the driver arrives.

jsx

 



 
import WaitDriver from "../components/WaitDriver";

const Home  () > {
  const [waitDriver, setWaitDriver]  useState(true);
  const ride  { id: "64f1a2b3c4d5e6f7g8h9i0j2" };

  return (
    <div>
      <WaitDriver ride{ride} setWaitDriver{setWaitDriver} />
    </div>
  );
};
Output: A message like "Waiting for your driver to arrive...".

⚙️ Backend Overview
The backend is split into microservices, each running on a different port. We use Node.js with Express for APIs, MongoDB for data storage, and Mongoose for schema modeling. Authentication is handled with JWT, and real-time updates use Socket.IO.

Key Endpoints and Events
Below are examples for each key API, RabbitMQ event, and WebSocket event.

Example: User Registration API
This endpoint registers a new user.

bash

 



 
curl -X POST http://localhost:3001/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{"fullName": {"firstName": "John", "lastName": "Doe"}, "email": "john@example.com", "password": "securepassword123"}'
Response:

json

 



 
{
  "message": "User created successfully",
  "success": true,
  "token": "your_jwt_token"
}
Example: Captain Registration API
This endpoint registers a new captain with vehicle details.

bash

 



 
curl -X POST http://localhost:3002/api/v1/captains/register \
-H "Content-Type: application/json" \
-d '{"fullName": {"firstName": "Jane", "lastName": "Doe"}, "email": "jane@example.com", "password": "securepassword123", "vehicle": {"type": "car", "licensePlate": "ABC123", "model": "Toyota Corolla", "color": "Blue", "capacity": 4}}'
Response:

json

 



 
{
  "message": "Captain registered successfully",
  "success": true,
  "token": "your_jwt_token"
}
Example: Create Ride API
This endpoint creates a new ride request.

bash

 



 
curl -X POST http://localhost:3003/api/v1/rides/create \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{"pickup": "123 Main St", "destination": "456 Park Ave", "vehicleType": "car"}'
Response:

json

 



 
{
  "user": "64f1a2b3c4d5e6f7g8h9i0j1",
  "pickup": "123 Main St",
  "destination": "456 Park Ave",
  "fare": 150.75,
  "otp": "123456",
  "status": "pending",
  "_id": "64f1a2b3c4d5e6f7g8h9i0j2"
}
Example: Confirm Ride API
This endpoint lets a captain confirm a ride.

bash

 



 
curl -X POST http://localhost:3003/api/v1/rides/confirm-ride \
-H "Authorization: Bearer captain_jwt_token" \
-H "Content-Type: application/json" \
-d '{"rideId": "64f1a2b3c4d5e6f7g8h9i0j2"}'
Response:

json

 



 
{
  "id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "captain": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "fullName": { "firstName": "Jane", "lastName": "Doe" }
  },
  "status": "accepted"
}
Example: Get Coordinates API
This endpoint fetches coordinates for an address.

bash

 



 
curl -X GET "http://localhost:3004/api/v1/maps/get-coordinate?address123+Main+St" \
-H "Authorization: Bearer your_jwt_token"
Response:

json

 



 
{
  "success": true,
  "message": "Coordinates fetched successfully",
  "data": {
    "lat": 37.422,
    "lng": -122.084
  }
}
Example: RabbitMQ Event (rideCreated)
This event is published when a new ride is created.

json

 



 
{
  "rideId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "pickup": "123 Main St",
  "destination": "456 Park Ave",
  "vehicleType": "car",
  "fare": 150.75
}
Usage: The Captain Service subscribes to this event and notifies nearby captains.

Example: WebSocket Event (newRideRequest)
This event notifies captains of a new ride request.

json

 



 
{
  "event": "newRideRequest",
  "ride": {
    "rideId": "64f1a2b3c4d5e6f7g8h9i0j2",
    "pickup": "123 Main St",
    "destination": "456 Park Ave",
    "fare": 150.75
  }
}
Usage: Captains see this in the RidePopup component and can accept the ride.

🛠️ Setup Instructions
Let’s get Rideo running on your machine!

Prerequisites
Node.js (v16 or higher)
MongoDB (local or Atlas)
RabbitMQ (local or CloudAMQP)
JazzCash API keys (for payments in Pakistan)
1. Clone the Repository
bash

 



 
git clone <repository-url>
cd Rideo
2. Setup Environment Variables
Create .env files in each directory:

Frontend (frontend/.env):


 



 
VITE_BACKEND_URLhttp://localhost:3001
User Service (backend/User/.env):


 



 
PORT3001
MONGO_URImongodb://localhost:27017/user_db
JWT_SECRETyour_jwt_secret
Captain Service (backend/Captain/.env):


 



 
PORT3002
MONGO_URImongodb://localhost:27017/captain_db
JWT_SECRETyour_jwt_secret
Ride Service (backend/Ride/.env):


 



 
PORT3003
MONGO_URImongodb://localhost:27017/ride_db
RABBIT_URLamqp://localhost
JWT_SECRETyour_jwt_secret
Map Service (backend/Maps/.env):


 



 
PORT3004
GOOGLE_MAPS_API_KEYyour_google_maps_api_key
3. Install Dependencies
For the frontend:
bash

 



 
cd frontend
npm install
For each backend service:
bash

 



 
cd backend/User
npm install
cd ../Captain
npm install
cd ../Ride
npm install
cd ../Maps
npm install
cd ../Socket
npm install
4. Start the Services
Ensure MongoDB and RabbitMQ are running.
Start each service in a separate terminal:
bash

 



 
# Frontend
cd frontend
npm run dev

# User Service
cd backend/User
npm start

# Captain Service
cd backend/Captain
npm start

# Ride Service
cd backend/Ride
npm start

# Map Service
cd backend/Maps
npm start

# Socket Server
cd backend/Socket
npm start
5. Access the App
Frontend: http://localhost:5173
User Service: http://localhost:3001
Captain Service: http://localhost:3002
Ride Service: http://localhost:3003
Map Service: http://localhost:3004
💡 Development Tips
Frontend:
Start the dev server:
bash

 



cd frontend
npm run dev
Build for production:
bash






npm run build
Add TypeScript for better type safety (use the Vite TS template).
Backend:
Start each service:
bash

 



cd backend/<Service>
npm start
Test APIs with Postman or curl.
Payments:
Use JazzCash for Pakistan. For testing, you can integrate Stripe (requires a US-based company setup).
Debugging:
Check logs in each service for errors.
Ensure RabbitMQ and MongoDB are running.
