import { validationResult } from "express-validator";
import { getAddressCoordinate, getDistanceTimeService, getSuggestionService } from "../services/maps.service.js";

// Controller to get coordinates for an address
export const getCoordinate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: errors.array()
        });
    }

    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinate(address);
        return res.status(200).json({
            success: true,
            message: "Coordinates fetched successfully",
            data: coordinates
        });
    } catch (err) {
        console.error("Error in getCoordinate controller:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

// Controller to get distance and time between two locations
export const getDistanceTime = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: errors.array()
        });
    }

    try {
        const { origin, destination } = req.query;


        const resp = await getDistanceTimeService(origin, destination);


        return res.status(200).json({
            success: true,
            message: "Distance and time calculated successfully",
            data: resp
        });
    } catch (error) {
        console.error("Error in getDistanceTime controller:", error.message);


        return res.status(400).json({
            success: false,
            message: error.message || "An error occurred while calculating distance and time",
            error: error.message
        });
    }
};


//! Get suggestion
export const getSuggestion = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Error in input",
            errors: errors.array()
        })
    }
    const { input } = req.query;

    try {
        const result = await getSuggestionService(input);
        return res.status(200).json(result);
    }
    catch (err) {
        console.error(err?.message);
        return res.status(400).json({
            message: "Error",
            errors: err?.message
        })
    }
}