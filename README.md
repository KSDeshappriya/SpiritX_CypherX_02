# SpiritX CypherX 02

Welcome to the **SpiritX CypherX 02** project! This repository hosts the source code and resources for the SpiritX CypherX application, a comprehensive platform for managing cricket teams and players.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Setup Guide](#setup-guide)
- [How to Use](#how-to-use)
- [Contributing Guidelines](#contributing-guidelines)
- [API Documentation](#api-documentation)
- [Database Management](#database-management)
- [License](#license)

## Overview

SpiritX CypherX 02 is a modern web application tailored for cricket enthusiasts. It provides tools for team management, leaderboard tracking, and player statistics, all within an intuitive interface.

## Key Features

- **Admin Dashboard**: Manage teams and players efficiently. *(Path: `/admin`)*
- **Budget Tracker**: Monitor team budgets and expenses. *(Path: `/budget`)*
- **Leaderboard**: View team rankings and performance metrics. *(Path: `/leaderboard`)*
- **Player Profiles**: Access detailed player statistics and information. *(Path: `/profile`)*
- **Home Page**: Showcases a hero section and general application details. *(Path: `/`)*
- **Authentication**: Secure login and signup functionality. *(Paths: `/login`, `/signup`)*
- **Players Page**: Browse a comprehensive list of players. *(Path: `/players`)*
- **Team Selection**: Create and manage your team. *(Path: `/select-team`)*

## Setup Guide

Follow these steps to set up the project locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/KSDeshappriya/SpiritX_CypherX_02.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd SpiritX_CypherX_02
    ```
3. **Install Dependencies**:
    ```bash
    pnpm install
    ```
4. **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the required environment variables. Refer to `.env.example` for guidance.

## Database Management

The application uses **Prisma** as the ORM for database interactions. To manage database migrations, use the following commands:

1. **Run Migrations**:
    ```bash
    npx prisma migrate dev --name <migration_name>
    ```
2. **Generate Prisma Client**:
    ```bash
    npx prisma generate
    ```

Ensure your database connection is properly configured in the `.env` file.

## How to Use

1. **Start the Development Server**:
    ```bash
    npm run dev
    ```
2. **Access the Application**:
    Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Contributing Guidelines

We welcome contributions to enhance SpiritX CypherX 02! Here's how you can contribute:

1. **Fork the Repository**.
2. **Create a Feature Branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Commit Your Changes**:
    ```bash
    git commit -m "Add your-feature-name"
    ```
4. **Push to Your Branch**:
    ```bash
    git push origin feature/your-feature-name
    ```
5. **Submit a Pull Request**.

## API Documentation

The backend API is built using Next.js API routes and includes the following endpoints:

- **Authentication**:
  - `POST /api/login`: Authenticate users.
  - `POST /api/signup`: Register new users.
- **User Management**:
  - `GET /api/user/profile`: Fetch user profile details.

All endpoints are secured and follow RESTful principles.

## License

This project is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** License. For more details, refer to the [LICENSE](./LICENSE) file.

---

For any questions, suggestions, or feedback, feel free to reach out. Happy coding!
