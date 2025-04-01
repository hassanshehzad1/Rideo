import axios from "axios";

// Function to convert seconds to a human-readable duration string
const formatDuration = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);

    let text = "";
    if (days > 0) text += `${days} day${days > 1 ? "s" : ""} `;
    if (hours > 0) text += `${hours} hour${hours > 1 ? "s" : ""} `;
    if (minutes > 0 || text === "") text += `${minutes} min${minutes !== 1 ? "s" : ""}`;

    return text.trim();
};

// Function to get coordinates from an address using Geoapify Geocoding API
export const getAddressCoordinate = async (address) => {
    try {
        const API_KEY = process.env.GEOAPIFY_API_KEY;
        if (!API_KEY) {
            throw new Error("Geoapify API key is missing in environment variables");
        }

        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`;
        const response = await axios.get(url);



        if (response.data.features && response.data.features.length > 0) {
            const feature = response.data.features[0];
            const [lng, lat] = feature.geometry.coordinates;
            return { lat, lng };
        } else {
            throw new Error(`No coordinates found for address: ${address}`);
        }
    } catch (error) {
        console.error(`Error in getAddressCoordinate for ${address}:`, error.message);
        throw error;
    }
};

// Function to get distance and time between origin and destination
export const getDistanceTimeService = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and Destination are required");
    }

    try {

        const originCoords = await getAddressCoordinate(origin);
        const destinationCoords = await getAddressCoordinate(destination);




        const API_KEY = process.env.GEOAPIFY_API_KEY;
        if (!API_KEY) {
            throw new Error("Geoapify API key is missing in environment variables");
        }

        // Geoapify Route Matrix API endpoint
        const url = `https://api.geoapify.com/v1/routematrix?apiKey=${API_KEY}`;

        // Request body for the POST request
        const body = {
            mode: "drive",
            sources: [{ location: [originCoords.lng, originCoords.lat] }],
            targets: [{ location: [destinationCoords.lng, destinationCoords.lat] }],
            units: "metric"
        };

        // Make the POST request to Geoapify Route Matrix API
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });




        if (response.data && response.data.sources_to_targets && response.data.sources_to_targets.length > 0) {
            const result = response.data.sources_to_targets[0][0];

            if (typeof result.distance === "number" && typeof result.time === "number") {
                const distanceInKm = (result.distance / 1000).toFixed(1); // Convert to km and round to 1 decimal place
                const durationInSeconds = result.time; // Time in seconds
                return {
                    distance: {
                        text: `${distanceInKm} km`,
                        value: result.distance // Distance in meters (integer)
                    },
                    duration: {
                        text: formatDuration(durationInSeconds), // Human-readable format
                        value: durationInSeconds // Time in seconds (integer)
                    },
                    status: "OK"
                };
            } else {
                throw new Error(`No route found: ${result.message || "Unknown error"}`);
            }
        } else {
            throw new Error("Unable to fetch distance and time from Geoapify API");
        }
    } catch (error) {

        if (error.response && error.response.data) {
            if (error.response.data.message.includes("Too long distance")) {
                throw new Error("The distance between the locations is too long for calculation. Please select locations within 10,000 km.");
            }
            throw new Error(`API Error: ${error.response.data.message || "Unknown error"}`);
        }
        console.error("Error in getDistanceTimeService:", error.message);
        throw error;
    }
};


// Function to get place suggestions using Geoapify Autocomplete API
export const getSuggestionService = async (input) => {
    if (!input) {
        throw new Error("Input is required");
    }

    try {
        const API_KEY = process.env.GEOAPIFY_API_KEY;
        if (!API_KEY) {
            throw new Error("Geoapify API key is missing in environment variables");
        }

        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${API_KEY}&limit=5`;
        const response = await axios.get(url);

      
        if (response.data && response.data.features && response.data.features.length > 0) {
            const suggestions = response.data.features.map(feature => {
                const fullAddress = feature.properties.formatted;
               
                const termsArray = fullAddress.split(", ");
                let currentOffset = 0;
                const terms = termsArray.map(term => {
                    const termObj = {
                        offset: currentOffset,
                        value: term.trim()
                    };
                    currentOffset += term.length + 2; // Add length of term plus ", " (2 characters)
                    return termObj;
                });

                const mainText = termsArray[0]; // First term (e.g., "Object")
                const secondaryText = termsArray.slice(1).join(", "); // Rest of the terms (e.g., "1622 CL Hoorn, Netherlands")

                return {
                    description: fullAddress,
                    place_id: feature.properties.place_id,
                    structured_formatting: {
                        main_text: mainText,
                        secondary_text: secondaryText
                    },
                    terms: terms
                };
            });

            return suggestions;
        } else {
            throw new Error("No suggestions found for the given input");
        }
    } catch (error) {
        console.error("Error in getSuggestionService:", error.message);
        throw error;
    }
};