import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password: hashed,
      role
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ msg: "Register error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "No user" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, role: user.role });

  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
};