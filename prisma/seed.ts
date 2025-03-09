import { PrismaClient, Prisma } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

interface Player {
  name: string;
  university: string;
  role: string;
  value: number;
  batting: {
    runs: number;
    innings: number;
    average: number;
    strikeRate: number;
  } | null;
  bowling: {
    wickets: number;
    overs: number;
    runsConceded: number;
    economy: number;
    strikeRate: number;
  } | null;
}

async function seed() {
  const players: Player[] = [];

  // Read the CSV file
  fs.createReadStream(path.resolve(__dirname, 'data.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Parse the CSV row into a Player object
      const player: Player = {
        name: row.name,
        university: row.university,
        role: row.role,
        value: parseInt(row.value),
        batting: row.batting_runs ? {
          runs: parseInt(row.batting_runs),
          innings: parseInt(row.batting_innings),
          average: parseFloat(row.batting_average),
          strikeRate: parseFloat(row.batting_strikeRate),
        } : null,
        bowling: row.bowling_wickets ? {
          wickets: parseInt(row.bowling_wickets),
          overs: parseInt(row.bowling_overs),
          runsConceded: parseInt(row.bowling_runsConceded),
          economy: parseFloat(row.bowling_economy),
          strikeRate: parseFloat(row.bowling_strikeRate),
        } : null,
      };
      players.push(player);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');

      // Insert players into the database
      for (const player of players) {
        await prisma.player.create({
          data: {
            name: player.name,
            university: player.university,
            role: player.role,
            value: player.value,
            batting: player.batting ? JSON.stringify(player.batting) : Prisma.JsonNull,
            bowling: player.bowling ? JSON.stringify(player.bowling) : Prisma.JsonNull,
          },
        });
      }

      console.log('Database seeded successfully');
      await prisma.$disconnect();
    });
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});