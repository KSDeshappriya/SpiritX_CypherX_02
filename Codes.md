

Workspace: Collecting workspace informationFiltering to most relevant informationTo create the backend for the **SpiritII Fantasy Cricket Platform** using Next.js API routes, Node.js, and Prisma with MySQL, follow these steps:

### Step 1: Initialize the Project

1. **Create a new Next.js project**:
   ```sh
   npx create-next-app@latest spiritii-fantasy-cricket
   cd spiritii-fantasy-cricket
   ```

2. **Install necessary dependencies**:
   ```sh
   npm install prisma @prisma/client next-auth bcryptjs
   npm install --save-dev @types/bcryptjs
   ```

3. **Initialize Prisma**:
   ```sh
   npx prisma init
   ```

### Step 2: Configure Prisma

1. **Update `schema.prisma`**:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model Player {
     id            Int      @id @default(autoincrement())
     name          String
     university    String
     battingRuns   Int
     ballsFaced    Int
     wickets       Int
     isFromDataset Boolean  @default(true)
   }

   model User {
     id          Int      @id @default(autoincrement())
     username    String   @unique
     password    String
     budget      Int      @default(9000000)
     teamPlayers Json?
     role        String   @default("USER")
   }

   model Leaderboard {
     userId      Int     @unique
     totalPoints Float
     user        User    @relation(fields: [userId], references: [id])
   }
   ```

2. **Run Prisma migrations**:
   ```sh
   npx prisma migrate dev --name init
   ```

3. **Seed the database**:
   Create a `prisma/seed.ts` file:
   ```typescript
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   async function main() {
     // Seed players
     await prisma.player.createMany({
       data: [
         { name: 'Danushka', university: 'University A', battingRuns: 1000, ballsFaced: 800, wickets: 50 },
         // Add more players as needed
       ],
     });

     // Seed predefined user
     const hashedPassword = await bcrypt.hash('password123', 10);
     await prisma.user.create({
       data: {
         username: 'spiritx_2025',
         password: hashedPassword,
         budget: 9000000,
         teamPlayers: JSON.stringify([]),
         role: 'USER',
       },
     });
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

   Run the seed script:
   ```sh
   npx ts-node prisma/seed.ts
   ```

### Step 3: Implement API Routes

1. **Create API routes for players**:

   - **Get all players**:
     ```typescript
     // filepath: /pages/api/players/index.ts
     import { NextApiRequest, NextApiResponse } from 'next';
     import { PrismaClient } from '@prisma/client';

     const prisma = new PrismaClient();

     export default async function handler(req: NextApiRequest, res: NextApiResponse) {
       if (req.method === 'GET') {
         const players = await prisma.player.findMany();
         res.status(200).json(players);
       } else {
         res.setHeader('Allow', ['GET']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

   - **Get player by ID**:
     ```typescript
     // filepath: /pages/api/players/[id].ts
     import { NextApiRequest, NextApiResponse } from 'next';
     import { PrismaClient } from '@prisma/client';

     const prisma = new PrismaClient();

     export default async function handler(req: NextApiRequest, res: NextApiResponse) {
       const { id } = req.query;

       if (req.method === 'GET') {
         const player = await prisma.player.findUnique({
           where: { id: Number(id) },
         });
         if (player) {
           res.status(200).json(player);
         } else {
           res.status(404).json({ message: 'Player not found' });
         }
       } else {
         res.setHeader('Allow', ['GET']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

   - **Create a new player**:
     ```typescript
     // filepath: /pages/api/players/index.ts
     import { NextApiRequest, NextApiResponse } from 'next';
     import { PrismaClient } from '@prisma/client';

     const prisma = new PrismaClient();

     export default async function handler(req: NextApiRequest, res: NextApiResponse) {
       if (req.method === 'GET') {
         const players = await prisma.player.findMany();
         res.status(200).json(players);
       } else if (req.method === 'POST') {
         const { name, university, battingRuns, ballsFaced, wickets } = req.body;
         const newPlayer = await prisma.player.create({
           data: {
             name,
             university,
             battingRuns,
             ballsFaced,
             wickets,
             isFromDataset: false,
           },
         });
         res.status(201).json(newPlayer);
       } else {
         res.setHeader('Allow', ['GET', 'POST']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

   - **Update a player**:
     ```typescript
     // filepath: /pages/api/players/[id].ts
     import { NextApiRequest, NextApiResponse } from 'next';
     import { PrismaClient } from '@prisma/client';

     const prisma = new PrismaClient();

     export default async function handler(req: NextApiRequest, res: NextApiResponse) {
       const { id } = req.query;

       if (req.method === 'GET') {
         const player = await prisma.player.findUnique({
           where: { id: Number(id) },
         });
         if (player) {
           res.status(200).json(player);
         } else {
           res.status(404).json({ message: 'Player not found' });
         }
       } else if (req.method === 'PUT') {
         const { name, university, battingRuns, ballsFaced, wickets } = req.body;
         const updatedPlayer = await prisma.player.update({
           where: { id: Number(id) },
           data: {
             name,
             university,
             battingRuns,
             ballsFaced,
             wickets,
           },
         });
         res.status(200).json(updatedPlayer);
       } else {
         res.setHeader('Allow', ['GET', 'PUT']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

   - **Delete a player**:
     ```typescript
     // filepath: /pages/api/players/[id].ts
     import { NextApiRequest, NextApiResponse } from 'next';
     import { PrismaClient } from '@prisma/client';

     const prisma = new PrismaClient();

     export default async function handler(req: NextApiRequest, res: NextApiResponse) {
       const { id } = req.query;

       if (req.method === 'GET') {
         const player = await prisma.player.findUnique({
           where: { id: Number(id) },
         });
         if (player) {
           res.status(200).json(player);
         } else {
           res.status(404).json({ message: 'Player not found' });
         }
       } else if (req.method === 'DELETE') {
         await prisma.player.delete({
           where: { id: Number(id) },
         });
         res.status(204).end();
       } else {
         res.setHeader('Allow', ['GET', 'DELETE']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

### Step 4: Implement Authentication

1. **Configure NextAuth.js**:
   - Create a `[...nextauth].ts` file:
     ```typescript
     // filepath: /pages/api/auth/[...nextauth].ts
     import NextAuth from 'next-auth';
     import CredentialsProvider from 'next-auth/providers/credentials';
     import { PrismaClient } from '@prisma/client';
     import bcrypt from 'bcryptjs';

     const prisma = new PrismaClient();

     export default NextAuth({
       providers: [
         CredentialsProvider({
           name: 'Credentials',
           credentials: {
             username: { label: 'Username', type: 'text' },
             password: { label: 'Password', type: 'password' },
           },
           async authorize(credentials) {
             const user = await prisma.user.findUnique({
               where: { username: credentials.username },
             });

             if (user && bcrypt.compareSync(credentials.password, user.password)) {
               return { id: user.id, username: user.username, role: user.role };
             } else {
               return null;
             }
           },
         }),
       ],
       callbacks: {
         async jwt(token, user) {
           if (user) {
             token.id = user.id;
             token.role = user.role;
           }
           return token;
         },
         async session(session, token) {
           session.user.id = token.id;
           session.user.role = token.role;
           return session;
         },
       },
       secret: process.env.NEXTAUTH_SECRET,
     });
     ```

### Step 5: Implement Real-Time Updates

1. **Set up Socket.io**:
   - Install Socket.io:
     ```sh
     npm install socket.io socket.io-client
     ```

   - Create a Socket.io server:
     ```typescript
     // filepath: /pages/api/socket.ts
     import { Server } from 'socket.io';

     const ioHandler = (req, res) => {
       if (!res.socket.server.io) {
         const io = new Server(res.socket.server);
         res.socket.server.io = io;

         io.on('connection', (socket) => {
           console.log('New client connected');

           socket.on('disconnect', () => {
             console.log('Client disconnected');
           });
         });
       }
       res.end();
     };

     export default ioHandler;
     ```

   - Initialize Socket.io in `_app.tsx`:
     ```typescript
     // filepath: /pages/_app.tsx
     import { useEffect } from 'react';
     import { io } from 'socket.io-client';
     import { SessionProvider } from 'next-auth/react';
     import '../styles/globals.css';

     function MyApp({ Component, pageProps: { session, ...pageProps } }) {
       useEffect(() => {
         const socket = io();
         return () => {
           socket.disconnect();
         };
       }, []);

       return (
         <SessionProvider session={session}>
           <Component {...pageProps} />
         </SessionProvider>
       );
     }

     export default MyApp;
     ```

### Step 6: Implement AI Chatbot

1. **Create Chatbot API route**:
   ```typescript
   // filepath: /pages/api/chatbot.ts
   import { NextApiRequest, NextApiResponse } from 'next';
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     const { query } = req.body;

     if (req.method === 'POST') {
       // Basic rule-based query parsing
       if (query.includes('batting average')) {
         const playerName = query.split(' ')[0];
         const player = await prisma.player.findFirst({ where: { name: playerName } });
         if (player) {
           const battingAverage = player.battingRuns / player.ballsFaced;
           res.status(200).json({ response: `${playerName}'s batting average is ${battingAverage}` });
         } else {
           res.status(404).json({ response: 'Player not found' });
         }
       } else {
         res.status(200).json({ response: "I don't have enough knowledge to answer that." });
       }
     } else {
       res.setHeader('Allow', ['POST']);
       res.status(405).end(`Method ${req.method} Not Allowed`);
     }
   }
   ```

### Step 7: Deployment

1. **Deploy to Vercel**:
   - Push your code to a GitHub repository.
   - Connect your repository to Vercel and deploy.

2. **Set environment variables**:
   - Set `DATABASE_URL` and `NEXTAUTH_SECRET` in Vercel's environment settings.

### Final Checklist

- ✅ Implement all API routes for CRUD operations.
- ✅ Set up authentication with NextAuth.js.
- ✅ Implement real-time updates with Socket.io.
- ✅ Create a basic AI chatbot.
- ✅ Deploy the application to Vercel.

This setup ensures a scalable and real-time fantasy cricket platform. Happy coding! 🚀

Similar code found with 2 license types