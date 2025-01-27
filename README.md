# MERN Web Application

## Project Description
This is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes basic user authentication, 
a task management system, and a feed for users to post content. The backend is powered by Node.js with Express, and MongoDB is used for storing data. 
The frontend is built using React.js, styled with Bootstrap for responsiveness.

## Features Implemented
- **User Authentication**: Users can register, log in, and log out securely.
- **Task Management**: Users can create, update, and delete tasks.
- **User Feed**: Users can post content that is visible to others.
- **Responsive Design**: The application is fully responsive and works on mobile and desktop devices.
- **Error Handling**: Proper error messages and validation for all forms and API requests.

## Steps to Run the Project

### 1. Clone the repository
Clone this repository to your local machine using the following command:
```bash
git clone https://github.com/bhavishaymankani/affworld_assignment.git

### 2. Install necessary dependencies in frontend & backend.
Dependemcies like clodinary, mangoose, React dnd, bcrypt, jwt,nodemon, crypto,etc

### 3. Set up environment variables
Create a .env file in the backend directory
MONGO_URI=mongodb+srv://<MONGO_USERNAME>:<MONGO_PASSWORD>@cluster0.czo62.mongodb.net/affworld?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=<YOUR_JWT_SECRET>

PORT=5000

CLOUDINARY_CLOUD_NAME=<YOUR_CLOUDINARY_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_CLOUDINARY_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_CLOUDINARY_API_SECRET>

GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>

EMAIL_USER=<YOUR_EMAIL_USER>
EMAIL_PASS=<YOUR_EMAIL_PASSWORD>

BASE_URL=<YOUR_BASE_URL>
CLIENT_URL=<YOUR_CLIENT_URL>

### 4. Run the backend server with nodemon
nodemon server.js

### 5. Run the frontend development server
npm start
   
