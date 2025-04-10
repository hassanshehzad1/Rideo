import React from 'react';

const LocationSearchPanel = ({  suggestions, onSuggestionSelect }) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-5 mt-8">Choose a Location</h3>

            {suggestions.map((loc, index) =>
            (
                <div
                    key={index}
                    className='flex gap-4 border-3 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start'
                    onClick={() => {
                        onSuggestionSelect(loc?.description); // Handle suggestion selection
                        // setVehiclePanel(true);
                    }}
                >
                    {console.log(loc)}
                    <h2 className="bg-[#eee] h-8 flex items-center justify-center w-16 rounded-full">
                        <i className="ri-map-pin-fill text-xl"></i>
                    </h2>
                    <h4 className="font-medium">{loc?.description}</h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;