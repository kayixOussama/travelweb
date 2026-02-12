import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../queries/destinationQueries.js";

import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../queries/packagesQueries.js";

import {
  createContactMessage,
  getAllContactMessages,
} from "../queries/contactQueries.js";

// ─── Destinations ───

export const getDestinations = async (req, res) => {
  try {
    const rows = await getAllDestinations();
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error("getDestinations error:", err);
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
};

export const getDestination = async (req, res) => {
  try {
    const destination = await getDestinationById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({ data: destination });
  } catch (err) {
    console.error("getDestination error:", err);
    res.status(500).json({ error: "Failed to fetch destination" });
  }
};

export const addDestination = async (req, res) => {
  try {
    const destination = await createDestination(req.body);
    res.status(201).json({ data: destination });
  } catch (err) {
    console.error("addDestination error:", err);
    res.status(500).json({ error: "Failed to create destination" });
  }
};

export const editDestination = async (req, res) => {
  try {
    const destination = await updateDestination(req.params.id, req.body);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({ data: destination });
  } catch (err) {
    console.error("editDestination error:", err);
    res.status(500).json({ error: "Failed to update destination" });
  }
};

export const removeDestination = async (req, res) => {
  try {
    const destination = await deleteDestination(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({ data: destination });
  } catch (err) {
    console.error("removeDestination error:", err);
    res.status(500).json({ error: "Failed to delete destination" });
  }
};

// ─── Packages ───

export const getPackages = async (req, res) => {
  try {
    const rows = await getAllPackages();
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error("getPackages error:", err);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

export const getPackage = async (req, res) => {
  try {
    const pkg = await getPackageById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json({ data: pkg });
  } catch (err) {
    console.error("getPackage error:", err);
    res.status(500).json({ error: "Failed to fetch package" });
  }
};

export const addPackage = async (req, res) => {
  try {
    const pkg = await createPackage(req.body);
    res.status(201).json({ data: pkg });
  } catch (err) {
    console.error("addPackage error:", err);
    res.status(500).json({ error: "Failed to create package" });
  }
};

export const editPackage = async (req, res) => {
  try {
    const pkg = await updatePackage(req.params.id, req.body);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json({ data: pkg });
  } catch (err) {
    console.error("editPackage error:", err);
    res.status(500).json({ error: "Failed to update package" });
  }
};

export const removePackage = async (req, res) => {
  try {
    const pkg = await deletePackage(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json({ data: pkg });
  } catch (err) {
    console.error("removePackage error:", err);
    res.status(500).json({ error: "Failed to delete package" });
  }
};

// ─── Contact Messages ───

export const submitContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const saved = await createContactMessage({ name, email, subject, message });
    res.status(201).json({ data: saved });
  } catch (err) {
    console.error("submitContactMessage error:", err);
    res.status(500).json({ error: "Failed to save contact message" });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const rows = await getAllContactMessages();
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error("getContactMessages error:", err);
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
};
