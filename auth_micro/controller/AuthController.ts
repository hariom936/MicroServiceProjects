import bcrypt from 'bcrypt';
import prisma from '../config/db.config';
import jwt from 'jsonwebtoken';
// import "dotenv";
class AuthController {
    //Register

    static async register(req, res) {
        try {
            const { email, password, name } = req.body;

            // Check if the user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists' });
            }

            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            // Create the user
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            return res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            
            return res.status(500).json({ error: 'Something went wrong, please try again.' });
        }
    }

    //Login

    static async login(req, res) {
        try {
            const { email, password } = req.body;
    
            const user = await prisma.user.findUnique({
                where: { email },
            });
    
            if (user && bcrypt.compareSync(password, user.password)) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
    
                const jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error("JWT_SECRET is not defined in the environment variables.");
                }
    
                const token = jwt.sign(payload, jwtSecret, { expiresIn: "365d" });
    
                return res.json({ message: "Login Successfully...", access_token: `Bearer ${token}` });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong, please try again." });
        }
    }

    //
    static async user(req, res){
    
        const user = req.user;
        return res.status(200).json({user: user})
    }
}

export default AuthController;
