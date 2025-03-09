import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const players = await prisma.player.findMany();
    res.status(200).json(players);
  } else if (req.method === 'POST') {
    const { name, university, role, value, batting, bowling } = req.body;
    const player = await prisma.player.create({
      data: {
        name,
        university,
        role,
        value,
        batting,
        bowling,
      },
    });
    res.status(201).json(player);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}