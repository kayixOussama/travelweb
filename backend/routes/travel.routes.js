import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
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
  submitContactMessage,
  getContactMessages,
} from "../controllers/travel.controller.js";

const router = Router();

// ─── Destinations (public: GET, admin: CUD) ───
router.get("/destinations", getDestinations);
router.get("/destinations/:id", getDestination);
router.post("/destinations", requireAdmin, addDestination);
router.put("/destinations/:id", requireAdmin, editDestination);
router.delete("/destinations/:id", requireAdmin, removeDestination);

// ─── Packages (public: GET, admin: CUD) ───
router.get("/packages", getPackages);
router.get("/packages/:id", getPackage);
router.post("/packages", requireAdmin, addPackage);
router.put("/packages/:id", requireAdmin, editPackage);
router.delete("/packages/:id", requireAdmin, removePackage);

// ─── Contact Messages (public: POST, admin: GET) ───
router.post("/contact", submitContactMessage);
router.get("/contact", requireAdmin, getContactMessages);

export default router;
