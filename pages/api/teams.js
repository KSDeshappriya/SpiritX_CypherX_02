import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const teams = await prisma.team.findMany();
    res.status(200).json(teams);
  } else if (req.method === 'POST') {
    const { userId, playerIds } = req.body;
    const team = await prisma.team.create({
      data: {
        userId,
        playerIds,
      },
    });
    res.status(201).json(team);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}