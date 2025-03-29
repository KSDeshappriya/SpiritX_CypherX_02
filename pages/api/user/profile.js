import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { verify, decode } from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify JWT token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      const { name, email, password } = req.body;
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Update user information in the database
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          ...(hashedPassword ? { password: hashedPassword } : {}),
        },
      });

      // Respond with updated user data (excluding sensitive information like password)
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
