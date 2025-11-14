# Midnight Nation

Website for Midnight Nation TTRPG - A full-stack MERN application for tabletop RPG character management and gameplay.

## Features

- **User Authentication**: Sign up and login functionality with JWT-based authentication
- **Character Management**: Create, view, and manage your RPG characters
- **Campaign System**: Join campaigns and play with other users
- **Lore Database**: Explore the rich history and legends of Midnight Nation
- **Monster Compendium**: Browse creatures and their stats
- **Abilities Reference**: View available character abilities and powers
- **Rules Documentation**: Complete game rules and mechanics

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AJRead13/midnight_nation.git
cd midnight_nation
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

## Configuration

### Server Setup

1. Create a `.env` file in the `server` directory (use `.env.example` as template):
```
MONGODB_URI=mongodb://localhost:27017/midnight_nation
JWT_SECRET=your_secure_jwt_secret_key
PORT=5000
```

2. If using MongoDB Atlas, replace the MONGODB_URI with your connection string.

### Client Setup

The client is already configured to connect to `http://localhost:5000/api`. If you need to change this, edit the `.env` file in the `client` directory.

## Running the Application

### Development Mode

#### Option 1: Run both servers separately

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the React frontend:
```bash
cd client
npm start
```

The frontend will open at `http://localhost:3000` and the backend API runs at `http://localhost:5000`.

#### Option 2: Run both servers concurrently (requires concurrently package)

From the root directory:
```bash
npm install -g concurrently
npm start
```

### Production Build

Build the React app for production:
```bash
cd client
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Characters
- `GET /api/characters` - Get all user's characters (protected)
- `GET /api/characters/:id` - Get single character (protected)
- `POST /api/characters` - Create character (protected)
- `PUT /api/characters/:id` - Update character (protected)
- `DELETE /api/characters/:id` - Delete character (protected)

### Campaigns
- `GET /api/campaigns` - Get user's campaigns (protected)
- `GET /api/campaigns/:id` - Get single campaign (protected)
- `POST /api/campaigns` - Create campaign (protected)
- `PUT /api/campaigns/:id` - Update campaign (protected)
- `POST /api/campaigns/:id/join` - Join campaign (protected)
- `POST /api/campaigns/:id/leave` - Leave campaign (protected)
- `DELETE /api/campaigns/:id` - Delete campaign (protected)

### Lore
- `GET /api/lore` - Get all lore entries
- `GET /api/lore/:id` - Get single lore entry

### Monsters
- `GET /api/monsters` - Get all monsters
- `GET /api/monsters/:id` - Get single monster

### Abilities
- `GET /api/abilities` - Get all abilities
- `GET /api/abilities/:id` - Get single ability

## Project Structure

```
midnight_nation/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (AuthContext)
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions and API calls
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── middleware/       # Express middleware (auth)
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── index.js         # Server entry point
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on GitHub.
