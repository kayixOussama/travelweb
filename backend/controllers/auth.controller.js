import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByName, createUser } from "../queries/userQueries.js";

const JWT_SECRET = process.env.JWT_SECRET || "hashem-admin-secret-key";

// ─── Register ───

export const register = async (req, res) => {
  try {
    const { name, password, role } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const existing = await findUserByName(name);
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, password: hashedPassword, role: role || "admin" });

    res.status(201).json({ data: user });
  } catch (err) {
    console.error("register error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// ─── Login ───

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const user = await findUserByName(name);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin role required" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      data: {
        token,
        user: { id: user.id, name: user.name, role: user.role },
      },
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
};

// ─── Verify token (for frontend to check auth status) ───

export const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    res.status(200).json({
      data: { id: decoded.id, name: decoded.name, role: decoded.role },
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
