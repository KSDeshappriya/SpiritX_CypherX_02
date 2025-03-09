import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const leaderboard = await prisma.leaderboard.findMany({
      orderBy: {
        rank: 'asc',
      },
    });
    res.status(200).json(leaderboard);
  } else if (req.method === 'POST') {
    const { rank, username, points } = req.body;
    const entry = await prisma.leaderboard.create({
      data: {
        rank,
        username,
        points,
      },
    });
    res.status(201).json(entry);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}