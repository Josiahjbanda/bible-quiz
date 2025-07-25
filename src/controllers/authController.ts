import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken'; // ✅ Ensure this path is correct

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, email, password });
  const token = generateToken(user);

  res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
};
