import { Router } from "express";
import {
  getDestinations,
  getDestination,
  addDestination,
  editDestination,
  removeDestination,
  getPackages,
  getPackage,
  addPackage,
  editPackage,
  removePackage,
} from "../controllers/travel.controller.js";

const router = Router();

// Destinations
router.get("/destinations", getDestinations);
router.get("/destinations/:id", getDestination);
router.post("/destinations", addDestination);
router.put("/destinations/:id", editDestination);
router.delete("/destinations/:id", removeDestination);

// Packages
router.get("/packages", getPackages);
router.get("/packages/:id", getPackage);
router.post("/packages", addPackage);
router.put("/packages/:id", editPackage);
router.delete("/packages/:id", removePackage);

export default router;
