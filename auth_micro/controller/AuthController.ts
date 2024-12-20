import bcrypt from 'bcrypt';
import prisma from '../config/db.config';

class AuthController {
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
}

export default AuthController;
