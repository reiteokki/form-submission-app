import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.customer.create({
      data: { email, password: hashedPassword },
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      form_filled: user.form_filled,
    });
  } catch (error) {
    console.error("🔥 Register error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.customer.findUnique({
      where: { email },
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET || "refresh_secret",
      { expiresIn: "7d" }
    );

    return res.json({
      id: user.id,
      email: user.email,
      form_filled: user.form_filled,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};

// REFRESH TOKEN
export const refreshToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || "refresh_secret"
    ) as { id: number; email: string };

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("🔥 Refresh token error:", error);
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};

// SUBMIT FORM
export const submitForm = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { name, phone } = req.body;
    const file = req.file;

    const updatedUser = await prisma.customer.update({
      where: { id: req.user.id },
      data: {
        name,
        phone_number: phone,
        image: file ? `/uploads/${file.filename}` : undefined,
        form_filled: true,
      },
    });

    return res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      phone_number: updatedUser.phone_number,
      image: updatedUser.image,
      form_filled: updatedUser.form_filled,
    });
  } catch (error) {
    console.error("🔥 Form submission error:", error);
    return res.status(500).json({ error: "Form submission failed" });
  }
};

// GET CUSTOMER BY ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        image: true,
        form_filled: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    return res.json(customer);
  } catch (error) {
    console.error("🔥 Get customer error:", error);
    return res.status(500).json({ error: "Failed to fetch customer" });
  }
};
