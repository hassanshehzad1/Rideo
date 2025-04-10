import express from "express";
import { getCoordinate, getDistanceTime, getSuggestion } from "../controllers/map.controller.js";
import { query } from "express-validator";
import { protect } from "../middleware/auth.middlware.js";
const router = express.Router();

router.get("/get-coordinate",
    query("address").isString().isLength({ min: 3 }),
    protect, getCoordinate);

router.get("/get-distance-time", query('origin').isString().isLength({ min: 3 }),
    query('destination').isLength({ min: 3 }),
    protect,
    getDistanceTime
)
//! Autocomplete route
router.get("/get-suggestion", query('input').isString().isLength({ min: 3 }), protect, getSuggestion)

export default router;