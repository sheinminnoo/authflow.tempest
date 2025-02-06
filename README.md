# AuthFlow.tempest

**AuthFlow.tempest** is a secure authentication system designed to handle user registration, OTP-based email verification, and password recovery. It ensures a seamless and secure experience by providing OTP expiration management, OTP resend functionality, and password reset via OTP.

## Features

- **User Registration**: Allows users to register with their email and password.
- **OTP-Based Email Verification**: Sends an OTP to the user's email for verification during registration.
- **OTP Expiration Management**: OTPs expire after a specified time (e.g., 10 minutes).
- **OTP Resend Functionality**: Users can request a new OTP if the previous one expires or is not received.
- **Password Recovery**: Enables users to reset their password via an OTP sent to their email.
- **Secure Authentication**: Passwords are securely hashed using bcrypt, and JWT tokens are used for session management.

## Installation

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (version >= 14)
- MongoDB (or MongoDB Atlas account)

### This is project `.env` format

Create a `.env` file in the root directory with the following contents:

```env
PORT=5000
MONGO_URL=mongodb+srv://<your-mongo-credentials>@authflow.sronl.mongodb.net/?retryWrites=true&w=majority&appName=authflow
EMAIL=<your-email>@gmail.com
EMAIL_PASSWORD=<your-email-password>
JWT=<your-secret-jwt-key>
NODE_ENV=

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/sheinminnoo/AuthFlow.tempest.git



