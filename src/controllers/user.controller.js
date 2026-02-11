import { users } from '../data/db.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //Validating input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({error: 'All fields are required'});
    }
    //Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({error: 'User already exists'});
    }
    const encryptedPassword = await hashPassword(password);
   //Create user
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password: encryptedPassword
    };
    users.push(newUser);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password
      }
    });
  }
  catch (error) {
    return res.status(500).json({error: 'Internal server error'});
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const loggedInUser = users.find(user => user.email === email);

    // 1. Check if user exists first
    if (!loggedInUser) {
      return res.status(400).json({ error: 'Invalid Email' });
    }
    const isPasswordValid = await comparePassword(password, loggedInUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.json({
      message: 'Login successful',
      user: {
        id: loggedInUser.id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};