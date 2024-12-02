# Distributed Cron Job with Fastify, Redis, and TypeScript

## Introduction

This repository demonstrates how to build a distributed cron job system using Fastify, Redis, and TypeScript. It includes a robust solution to manage periodic tasks in distributed systems while ensuring no duplicate executions. The use case involves checking for expired passwords in a database and notifying users via email.

## Features

-   **Fastify**: Lightweight, high-performance web framework for the application.
-   **Redis**: Ensures distributed locking to avoid duplicate job execution across multiple instances.
-   **Node-Cron**: Schedules periodic tasks with cron syntax.
-   **TypeScript**: Provides type safety and maintainability.
-   **Nodemailer**: Handles email notifications for expired passwords.
-   Modular and extensible architecture for ease of customization.

## Installation

### Prerequisites

-   Node.js (version 20 or higher recommended)
-   Redis server (locally or cloud-hosted)
-   A valid email account for sending notifications (e.g., Gmail, SendGrid, etc.)

### Clone the Repository

```bash
git clone https://github.com/valeriouberti/distributed-lock.git
cd distributed-lock
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

1. Create a `.env` file by copying the `.env.example` template:

```bash
cp .env.example .env
```

2. Fill in the required values in the `.env` file:

```plaintext
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
CRON_SCHEDULE=0 \* \* \* \*
```

-   Replace `EMAIL_USER` and `EMAIL_PASSWORD` with your email credentials. Use an App Password for Gmail.
-   Update Redis configuration based on your environment.

## Usage

### Run the Application

Start the server with:

```bash
npm run start
```

The application will:

-   Launch a Fastify server at http://localhost:3000.
-   Schedule a cron job based on the `CRON_SCHEDULE` environment variable.
-   Check for expired passwords and send email notifications.

## Project Structure

```plaintext
src/
├── config/
│ ├── redis.ts # Redis and Redlock configuration
│ └── mail.ts # Nodemailer configuration
├── jobs/
│ ├── lock.ts # Distributed lock implementation
│ └── password-expiry.job.ts # Cron job logic
├── services/
│ ├── user.service.ts # Business logic for fetching expired users
│ └── notification.service.ts # Email notification logic
├── app.ts # Fastify application setup
.env.example # Example environment variables
```

## Extending the Application

1. **Database Integration:** Replace the mock user data in user.service.ts with real database queries.

2. **Enhanced Notifications**: Use advanced email APIs like SendGrid or Amazon SES for better scalability.

3. **Monitoring**: Add monitoring tools like Sentry or Prometheus for observability and debugging.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality.
